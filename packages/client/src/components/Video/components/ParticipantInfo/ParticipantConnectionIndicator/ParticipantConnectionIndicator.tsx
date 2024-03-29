import * as React from 'react'

import useParticipantIsReconnecting from '../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting'
import { Participant } from 'twilio-video'
import { Tooltip } from 'antd'

export default function ParticipantConnectionIndicator({
    participant,
}: {
    participant: Participant
}) {
    const isReconnecting = useParticipantIsReconnecting(participant)
    return (
        <Tooltip
            title={
                isReconnecting
                    ? 'Participant is reconnecting'
                    : 'Participant is connected'
            }
        >
            <span />
        </Tooltip>
    )
}
