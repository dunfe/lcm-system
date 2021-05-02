import React from 'react'
import Participant from '../Participant/Participant'
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant'
import useParticipants from '../../hooks/useParticipants/useParticipants'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant'
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant'

export default function ParticipantList() {
    const { room } = useVideoContext()
    const localParticipant = room!.localParticipant
    const participants = useParticipants()
    const [
        selectedParticipant,
        setSelectedParticipant,
    ] = useSelectedParticipant()
    const screenShareParticipant = useScreenShareParticipant()
    const mainParticipant = useMainParticipant()
    const isRemoteParticipantScreenSharing =
        screenShareParticipant && screenShareParticipant !== localParticipant

    console.log(isRemoteParticipantScreenSharing)
    if (participants.length === 0) return null // Don't render this component if there are no remote participants.

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 400, padding: '2em' }}>
                <Participant
                    participant={localParticipant}
                    isLocalParticipant={true}
                />
                {participants.map((participant) => {
                    const isSelected = participant === selectedParticipant
                    const hideParticipant =
                        participant === mainParticipant &&
                        participant !== screenShareParticipant &&
                        !isSelected
                    return (
                        <Participant
                            key={participant.sid}
                            participant={participant}
                            isSelected={participant === selectedParticipant}
                            onClick={() => setSelectedParticipant(participant)}
                            hideParticipant={hideParticipant}
                        />
                    )
                })}
            </div>
        </div>
    )
}
