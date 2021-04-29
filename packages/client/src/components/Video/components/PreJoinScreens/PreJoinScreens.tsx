import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen'
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar'
import RoomNameScreen from './RoomNameScreen/RoomNameScreen'
import IntroContainer from '../IntroContainer/IntroContainer'
import { useAppState } from '../../state'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import { useFullname } from '../../../../utils/hooks/useFullname'
import { useParams } from 'react-router-dom'
import React from 'react'

export enum Steps {
    roomNameStep,
    deviceSelectionStep,
}

const { useState, useEffect } = React

const PreJoinScreens = () => {
    const { user } = useAppState()
    const { getAudioAndVideoTracks } = useVideoContext()
    const { URLRoomName } = useParams() as any
    const [step, setStep] = useState(Steps.roomNameStep)

    const [name] = useState<string>(useFullname() || '')
    const [roomName, setRoomName] = useState<string>('')

    const [mediaError, setMediaError] = useState<Error>()

    useEffect(() => {
        if (URLRoomName) {
            setRoomName(URLRoomName)
            if (user?.displayName) {
                setStep(Steps.deviceSelectionStep)
            }
        }
    }, [user, URLRoomName])

    useEffect(() => {
        if (step === Steps.deviceSelectionStep && !mediaError) {
            getAudioAndVideoTracks().catch((error) => {
                console.log('Error acquiring local media:')
                console.dir(error)
                setMediaError(error)
            })
        }
    }, [getAudioAndVideoTracks, step, mediaError])

    const handleSubmit = () => {
        setStep(Steps.deviceSelectionStep)
    }

    return (
        <IntroContainer>
            <MediaErrorSnackbar error={mediaError} />
            {step === Steps.roomNameStep && (
                <RoomNameScreen
                    name={name}
                    roomName={roomName}
                    handleSubmit={handleSubmit}
                />
            )}

            {step === Steps.deviceSelectionStep && (
                <DeviceSelectionScreen
                    name={name}
                    roomName={roomName}
                    setStep={setStep}
                />
            )}
        </IntroContainer>
    )
}

export default PreJoinScreens
