import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import React from 'react'
import { Button, Tooltip } from 'antd'
import { DesktopOutlined } from '@ant-design/icons'

export const SCREEN_SHARE_TEXT = 'Share Screen'
export const SHARE_IN_PROGRESS_TEXT =
    'Cannot share screen when another user is sharing'
export const SHARE_NOT_SUPPORTED_TEXT =
    'Screen sharing is not supported with this browser'

export default function ToggleScreenShareButton(props: { disabled?: boolean }) {
    const screenShareParticipant = useScreenShareParticipant()
    const { toggleScreenShare } = useVideoContext()
    const disableScreenShareButton = Boolean(screenShareParticipant)
    const isScreenShareSupported =
        navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia
    const isDisabled =
        props.disabled || disableScreenShareButton || !isScreenShareSupported

    let tooltipMessage = ''

    if (disableScreenShareButton) {
        tooltipMessage = SHARE_IN_PROGRESS_TEXT
    }

    if (!isScreenShareSupported) {
        tooltipMessage = SHARE_NOT_SUPPORTED_TEXT
    }

    return (
        <Tooltip
            title={tooltipMessage}
            placement="top"
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
            <span>
                {/* The span element is needed because a disabled button will not emit hover events and we want to display
          a tooltip when screen sharing is disabled */}
                <Button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    type={'text'}
                    onClick={toggleScreenShare}
                    disabled={isDisabled}
                    icon={<DesktopOutlined />}
                    data-cy-share-screen
                >
                    {SCREEN_SHARE_TEXT}
                </Button>
            </span>
        </Tooltip>
    )
}
