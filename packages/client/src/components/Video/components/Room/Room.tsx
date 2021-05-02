import * as React from 'react'

import ChatWindow from '../ChatWindow/ChatWindow'
import ParticipantList from '../ParticipantList/ParticipantList'
import MainParticipant from '../MainParticipant/MainParticipant'

const Room = () => {
    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <MainParticipant />
            <ParticipantList />
            <ChatWindow />
        </div>
    )
}

export default Room
