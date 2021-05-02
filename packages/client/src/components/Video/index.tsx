import * as React from 'react'

import VideoAppComponent from './App'
import AppStateProvider, { useAppState } from './state'
import ErrorDialog from './components/ErrorDialog/ErrorDialog'
import './types'
import { ChatProvider } from './components/ChatProvider'
import { VideoProvider } from './components/VideoProvider'
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions'
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import { PrivateRoute } from '../Auth/PrivateRoute'

const ThisVideoApp = () => {
    const { error, setError } = useAppState()
    const connectionOptions = useConnectionOptions()

    return (
        <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            <ChatProvider>
                <VideoAppComponent />
            </ChatProvider>
        </VideoProvider>
    )
}

const VideoApp = () => {
    return (
        <UnsupportedBrowserWarning>
            <AppStateProvider>
                <PrivateRoute path="/room/:URLRoomName">
                    <ThisVideoApp />
                </PrivateRoute>
            </AppStateProvider>
        </UnsupportedBrowserWarning>
    )
}

export default VideoApp
