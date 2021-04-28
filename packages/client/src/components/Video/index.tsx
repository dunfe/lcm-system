import React from 'react'

import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

import VideoAppComponent from './App'
import AppStateProvider, { useAppState } from './state'
import ErrorDialog from './components/ErrorDialog/ErrorDialog'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import theme from './theme'
import './types'
import { ChatProvider } from './components/ChatProvider'
import { VideoProvider } from './components/VideoProvider'
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions'
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning'

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
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <UnsupportedBrowserWarning>
                <AppStateProvider>
                    <PrivateRoute path="/room/:URLRoomName">
                        <ThisVideoApp />
                    </PrivateRoute>
                </AppStateProvider>
            </UnsupportedBrowserWarning>
        </MuiThemeProvider>
    )
}

export default VideoApp
