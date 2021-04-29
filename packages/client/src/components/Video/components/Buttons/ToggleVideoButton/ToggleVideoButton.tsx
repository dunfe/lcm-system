import VideoOffIcon from '../../../icons/VideoOffIcon'
import VideoOnIcon from '../../../icons/VideoOnIcon'

import useDevices from '../../../hooks/useDevices/useDevices'
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle'
import React, { useCallback, useRef } from 'react'
import { Button } from 'antd'

export default function ToggleVideoButton(props: {
    disabled?: boolean
    className?: string
}) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()
    const lastClickTimeRef = useRef(0)
    const { hasVideoInputDevices } = useDevices()

    const toggleVideo = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now()
            toggleVideoEnabled()
        }
    }, [toggleVideoEnabled])

    return (
        <Button
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            type={'text'}
            onClick={toggleVideo}
            disabled={!hasVideoInputDevices || props.disabled}
            icon={isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
        >
            {!hasVideoInputDevices
                ? 'No Video'
                : isVideoEnabled
                ? 'Stop Video'
                : 'Start Video'}
        </Button>
    )
}
