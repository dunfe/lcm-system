import LocalAudioLevelIndicator from '../../../LocalAudioLevelIndicator/LocalAudioLevelIndicator'
import VideoTrack from '../../../VideoTrack/VideoTrack'
import useVideoContext from '../../../../hooks/useVideoContext/useVideoContext'
import { LocalVideoTrack } from 'twilio-video'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Text } = Typography

export default function LocalVideoPreview({ identity }: { identity: string }) {
    const { localTracks } = useVideoContext()

    const videoTrack = localTracks.find((track) =>
        track.name.includes('camera')
    ) as LocalVideoTrack

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: 'black',
                    height: 150,
                }}
            >
                {videoTrack ? (
                    <VideoTrack track={videoTrack} isLocal />
                ) : (
                    <div>
                        <UserOutlined
                            style={{
                                color: 'white',
                                fontSize: 24,
                            }}
                        />
                    </div>
                )}
            </div>

            <div
                style={{
                    position: 'absolute',
                    left: 5,
                    bottom: 5,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <LocalAudioLevelIndicator />
                <Text
                    style={{
                        color: 'white',
                    }}
                >
                    {identity}
                </Text>
            </div>
        </div>
    )
}
