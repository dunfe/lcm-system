import * as React from 'react'

import {
    LocalAudioTrack,
    LocalVideoTrack,
    Participant,
    RemoteAudioTrack,
    RemoteVideoTrack,
} from 'twilio-video'

import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff'
import usePublications from '../../hooks/usePublications/usePublications'
import useTrack from '../../hooks/useTrack/useTrack'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting'
import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator'
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel'

import { Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Text } = Typography

interface MainParticipantInfoProps {
    participant: Participant
    children: React.ReactNode
}

const MainParticipantInfo = ({
    participant,
    children,
}: MainParticipantInfoProps) => {
    const { room } = useVideoContext()
    const localParticipant = room!.localParticipant
    const isLocal = localParticipant === participant

    const publications = usePublications(participant)
    const videoPublication = publications.find((p) =>
        p.trackName.includes('camera')
    )
    const screenSharePublication = publications.find((p) =>
        p.trackName.includes('screen')
    )

    const videoTrack = useTrack(screenSharePublication || videoPublication)
    const isVideoEnabled = Boolean(videoTrack)

    const audioPublication = publications.find((p) => p.kind === 'audio')
    const audioTrack = useTrack(audioPublication) as
        | LocalAudioTrack
        | RemoteAudioTrack
        | undefined

    const isVideoSwitchedOff = useIsTrackSwitchedOff(
        videoTrack as LocalVideoTrack | RemoteVideoTrack
    )
    const isParticipantReconnecting = useParticipantIsReconnecting(participant)

    return (
        <div
            data-cy-main-participant=""
            data-cy-participant={participant.identity}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    height: '100%',
                    width: '100%',
                }}
            >
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '0.1em 0.3em 0.1em 0',
                            display: 'inline-flex',
                            marginRight: '0.4em',
                            alignItems: 'center',
                        }}
                    >
                        <AudioLevelIndicator audioTrack={audioTrack} />
                        <Text style={{ color: 'white' }}>
                            {participant.identity}
                            {isLocal && ' (You)'}
                            {screenSharePublication && ' - Screen'}
                        </Text>
                    </div>
                    <NetworkQualityLevel participant={localParticipant} />
                </div>
            </div>
            {(!isVideoEnabled || isVideoSwitchedOff) && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'black',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                >
                    <UserOutlined
                        style={{
                            color: 'white',
                            fontSize: 100,
                        }}
                    />
                </div>
            )}
            {isParticipantReconnecting && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(40, 42, 43, 0.75)',
                        zIndex: 1,
                    }}
                >
                    <Text style={{ color: 'white' }}>Reconnecting...</Text>
                </div>
            )}
            {children}
        </div>
    )
}

export default MainParticipantInfo
