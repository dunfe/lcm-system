import React, { useState } from 'react'
import {
    DEFAULT_VIDEO_CONSTRAINTS,
    SELECTED_VIDEO_INPUT_KEY,
} from '../../../constants'
import { LocalVideoTrack } from 'twilio-video'
import VideoTrack from '../../VideoTrack/VideoTrack'
import useDevices from '../../../hooks/useDevices/useDevices'
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import { Select, Typography } from 'antd'

const { Text } = Typography

export default function VideoInputList() {
    const { videoInputDevices } = useDevices()
    const { localTracks } = useVideoContext()

    const localVideoTrack = localTracks.find(
        (track) => track.kind === 'video'
    ) as LocalVideoTrack | undefined
    const mediaStreamTrack = useMediaStreamTrack(localVideoTrack)
    const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
        window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
    )
    const localVideoInputDeviceId =
        mediaStreamTrack?.getSettings().deviceId || storedLocalVideoDeviceId

    function replaceTrack(newDeviceId: string) {
        // Here we store the device ID in the component state. This is so we can re-render this component display
        // to display the name of the selected device when it is changed while the users camera is off.
        setStoredLocalVideoDeviceId(newDeviceId)
        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId)
        localVideoTrack?.restart({
            ...(DEFAULT_VIDEO_CONSTRAINTS as any),
            deviceId: { exact: newDeviceId },
        })
    }

    const videoOptions = videoInputDevices.map((device) => {
        return {
            label: device.label,
            value: device.deviceId,
        }
    })

    return (
        <div>
            {localVideoTrack && (
                <div>
                    <VideoTrack isLocal track={localVideoTrack} />
                </div>
            )}
            {videoInputDevices.length > 1 ? (
                <>
                    <Text>Video Input</Text>
                    <Select
                        onChange={(e) => replaceTrack(e)}
                        value={localVideoInputDeviceId || ''}
                        options={videoOptions}
                    />
                </>
            ) : (
                <>
                    <Text>Video Input</Text>
                    <Typography>
                        {localVideoTrack?.mediaStreamTrack.label ||
                            'No Local Video'}
                    </Typography>
                </>
            )}
        </div>
    )
}
