import * as React from 'react'

import { IVideoTrack } from '../../types'
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack/useMediaStreamTrack'
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions'
import { Track } from 'twilio-video'
import styled from 'styled-components/macro'

interface VideoTrackProps {
    track: IVideoTrack
    isLocal?: boolean
    priority?: Track.Priority | null
}

const { useRef, useEffect } = React

export default function VideoTrack({
    track,
    isLocal,
    priority,
}: VideoTrackProps) {
    const ref = useRef<HTMLVideoElement>(null!)
    const mediaStreamTrack = useMediaStreamTrack(track)
    const dimensions = useVideoTrackDimensions(track)
    const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0)

    useEffect(() => {
        const el = ref.current
        el.muted = true
        if (track.setPriority && priority) {
            track.setPriority(priority)
        }
        track.attach(el)
        return () => {
            track.detach(el)
            if (track.setPriority && priority) {
                // Passing `null` to setPriority will set the track's priority to that which it was published with.
                track.setPriority(null)
            }
        }
    }, [track, priority])

    // The local video track is mirrored if it is not facing the environment.
    const isFrontFacing =
        mediaStreamTrack?.getSettings().facingMode !== 'environment'
    const style = {
        transform: isLocal && isFrontFacing ? 'rotateY(180deg)' : '',
        objectFit:
            isPortrait || track.name.includes('screen')
                ? ('contain' as const)
                : ('cover' as const),
    }

    return <Video ref={ref} style={style} />
}

const Video = styled.video`
    width: 100%;
    height: 100%;
`
