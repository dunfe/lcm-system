import MicIcon from '../../../icons/MicIcon'
import MicOffIcon from '../../../icons/MicOffIcon'

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import React from 'react'
import { Button } from 'antd'
import Icon from '@ant-design/icons'

const ToggleAudioButton = (props: {
    disabled?: boolean
    className?: string
}) => {
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle()
    const { localTracks } = useVideoContext()
    const hasAudioTrack = localTracks.some((track) => track.kind === 'audio')

    return (
        <Button
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            type={'text'}
            onClick={toggleAudioEnabled}
            disabled={!hasAudioTrack || props.disabled}
            icon={
                isAudioEnabled ? (
                    <Icon component={MicIcon} />
                ) : (
                    <Icon component={MicOffIcon} />
                )
            }
        >
            {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'}
        </Button>
    )
}

export default ToggleAudioButton
