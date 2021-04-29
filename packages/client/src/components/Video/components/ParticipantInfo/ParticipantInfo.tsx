import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator'
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel'

import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff'
import usePublications from '../../hooks/usePublications/usePublications'
import useTrack from '../../hooks/useTrack/useTrack'
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting'
import { Typography } from 'antd'
import {
    LocalAudioTrack,
    LocalVideoTrack,
    Participant,
    RemoteAudioTrack,
    RemoteVideoTrack,
} from 'twilio-video'
import React from 'react'
import {
    DesktopOutlined,
    UserOutlined,
    PushpinOutlined,
} from '@ant-design/icons'

interface ParticipantInfoProps {
    participant: Participant
    children: React.ReactNode
    onClick?: () => void
    isSelected?: boolean
    isLocalParticipant?: boolean
    hideParticipant?: boolean
}

const { Text } = Typography

export default function ParticipantInfo({
    participant,
    onClick,
    isSelected,
    children,
    isLocalParticipant,
}: ParticipantInfoProps) {
    const publications = usePublications(participant)

    const audioPublication = publications.find((p) => p.kind === 'audio')
    const videoPublication = publications.find((p) =>
        p.trackName.includes('camera')
    )

    const isVideoEnabled = Boolean(videoPublication)
    const isScreenShareEnabled = publications.find((p) =>
        p.trackName.includes('screen')
    )

    const videoTrack = useTrack(videoPublication)
    const isVideoSwitchedOff = useIsTrackSwitchedOff(
        videoTrack as LocalVideoTrack | RemoteVideoTrack
    )

    const audioTrack = useTrack(audioPublication) as
        | LocalAudioTrack
        | RemoteAudioTrack
        | undefined
    const isParticipantReconnecting = useParticipantIsReconnecting(participant)

    return (
        <div
            onClick={onClick}
            data-cy-participant={participant.identity}
            style={{
                display: 'grid',
                placeItems: 'center',
                border: '1px solid #fff',
                margin: 12,
            }}
        >
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <NetworkQualityLevel participant={participant} />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {isScreenShareEnabled && <DesktopOutlined />}
                    <AudioLevelIndicator audioTrack={audioTrack} />
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        {participant.identity}
                        {isLocalParticipant && ' (You)'}
                    </Text>
                </div>
                <div>{isSelected && <PushpinOutlined />}</div>
            </div>
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    height: '150px',
                }}
            >
                {(!isVideoEnabled || isVideoSwitchedOff) && (
                    <div>
                        <UserOutlined
                            style={{
                                color: 'white',
                                fontSize: 100,
                            }}
                        />
                    </div>
                )}
                {isParticipantReconnecting && (
                    <div>
                        <Text>Reconnecting...</Text>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}
