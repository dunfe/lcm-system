import * as React from 'react'

import MicIcon from '../../../icons/MicIcon'
import MicOffIcon from '../../../icons/MicOffIcon'

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import { Button } from 'antd'
import Icon from '@ant-design/icons'
import { useTrans } from 'common'

const ToggleAudioButton = (props: {
    disabled?: boolean
    className?: string
}) => {
    const trans = useTrans()
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
            {!hasAudioTrack
                ? trans('No Audio')
                : isAudioEnabled
                ? trans('Mute')
                : trans('Unmute')}
        </Button>
    )
}

export default ToggleAudioButton
