import * as React from 'react'

import AudioLevelIndicator from '../../AudioLevelIndicator/AudioLevelIndicator'
import { SELECTED_AUDIO_INPUT_KEY } from '../../../constants'
import useDevices from '../../../hooks/useDevices/useDevices'
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import { LocalAudioTrack } from 'twilio-video'
import { Select, Typography } from 'antd'

const { Text } = Typography

export default function AudioInputList() {
    const { audioInputDevices } = useDevices()
    const { localTracks } = useVideoContext()

    const localAudioTrack = localTracks.find(
        (track) => track.kind === 'audio'
    ) as LocalAudioTrack
    const mediaStreamTrack = useMediaStreamTrack(localAudioTrack)
    const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId

    function replaceTrack(newDeviceId: string) {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId)
        localAudioTrack?.restart({ deviceId: { exact: newDeviceId } })
    }

    const audioOption = audioInputDevices.map((device) => {
        return {
            label: device.label,
            value: device.deviceId,
        }
    })

    return (
        <div>
            <Text>Audio Input</Text>
            <div
                className="inputSelect"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {audioInputDevices.length > 1 ? (
                    <Select
                        onChange={(e) => replaceTrack(e)}
                        value={localAudioInputDeviceId || ''}
                        options={audioOption}
                    />
                ) : (
                    <Text>
                        {localAudioTrack?.mediaStreamTrack.label ||
                            'No Local Audio'}
                    </Text>
                )}
                <AudioLevelIndicator
                    audioTrack={localAudioTrack}
                    color="black"
                />
            </div>
        </div>
    )
}
