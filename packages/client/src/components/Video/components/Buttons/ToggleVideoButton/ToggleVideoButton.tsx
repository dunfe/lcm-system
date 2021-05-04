import * as React from 'react'

import VideoOffIcon from '../../../icons/VideoOffIcon'
import VideoOnIcon from '../../../icons/VideoOnIcon'

import useDevices from '../../../hooks/useDevices/useDevices'
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle'
import { Button } from 'antd'
import { useTrans } from 'common'

const { useCallback, useRef } = React
const ToggleVideoButton = (props: {
    disabled?: boolean
    className?: string
}) => {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()
    const lastClickTimeRef = useRef(0)
    const { hasVideoInputDevices } = useDevices()
    const trans = useTrans()

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
                ? trans('No Video')
                : isVideoEnabled
                ? trans('Stop Video')
                : trans('Start Video')}
        </Button>
    )
}

export default ToggleVideoButton
