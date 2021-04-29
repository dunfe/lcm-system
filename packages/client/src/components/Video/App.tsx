import MenuBar from './components/MenuBar/MenuBar'
import PreJoinScreens from './components/PreJoinScreens/PreJoinScreens'
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification'
import Room from './components/Room/Room'

import useHeight from './hooks/useHeight/useHeight'
import useRoomState from './hooks/useRoomState/useRoomState'
import React from 'react'
import styled from 'styled-components/macro'

export default function VideoAppComponent() {
    const roomState = useRoomState()

    const height = useHeight()

    return (
        <StyledVideoAppComponent style={{ height }}>
            {roomState === 'disconnected' ? (
                <PreJoinScreens />
            ) : (
                <StyledMain>
                    <ReconnectingNotification />
                    <Room />
                    <MenuBar />
                </StyledMain>
            )}
        </StyledVideoAppComponent>
    )
}

const StyledVideoAppComponent = styled.div`
    display: grid;
`

const StyledMain = styled.div`
    overflow: hidden;
    padding-bottom: 50px;
    background: black;
`
