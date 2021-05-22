import * as React from 'react'

import {
    settingsReducer,
    initialSettings,
    Settings,
    SettingsAction,
} from './settings/settingsReducer'
import useActiveSinkId from './useActiveSinkId/useActiveSinkId'
import { RoomType } from '../types'
import { TwilioError } from 'twilio-video'
import { useRole } from '../../../utils/hooks/useRole'

const { createContext, useContext, useReducer, useState } = React

export interface StateContextType {
    error: TwilioError | Error | null
    setError(error: TwilioError | Error | null): void
    getToken(name: string, room: string, passcode?: string): Promise<string>
    user?: null | {
        displayName: undefined
        photoURL: undefined
        passcode?: string
    }
    signIn?(passcode?: string): Promise<void>
    signOut?(): Promise<void>
    isAuthReady?: boolean
    isFetching: boolean
    activeSinkId: string
    setActiveSinkId(sinkId: string): void
    settings: Settings
    dispatchSetting: React.Dispatch<SettingsAction>
    roomType?: RoomType
}

const StateContext = createContext<StateContextType>(null!)

export default function AppStateProvider(props: React.PropsWithChildren<any>) {
    const [error, setError] = useState<TwilioError | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [activeSinkId, setActiveSinkId] = useActiveSinkId()
    const [settings, dispatchSetting] = useReducer(
        settingsReducer,
        initialSettings
    )

    const role = useRole()

    let contextValue = {
        error,
        setError,
        isFetching,
        activeSinkId,
        setActiveSinkId,
        settings,
        dispatchSetting,
    } as StateContextType

    contextValue = {
        ...contextValue,
        getToken: async (user_identity, room_name) => {
            const endpoint = 'http://localhost:3005/room/token'

            return fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    user_identity,
                    room_name,
                }),
            })
                .then((res) => res.json())
                .then((res) => res.token as string)
        },
    }

    const getToken: StateContextType['getToken'] = (name, room) => {
        setIsFetching(true)

        return contextValue
            .getToken(
                `${role?.charAt(0).toUpperCase() + role!.slice(1)} ${name}`,
                room
            )
            .then((res) => {
                setIsFetching(false)
                return res
            })
            .catch((err) => {
                setError(err)
                setIsFetching(false)
                return Promise.reject(err)
            })
    }

    return (
        <StateContext.Provider value={{ ...contextValue, getToken }}>
            {props.children}
        </StateContext.Provider>
    )
}

export function useAppState() {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider')
    }
    return context
}
