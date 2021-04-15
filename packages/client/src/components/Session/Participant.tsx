import * as React from 'react'
import { Button, message } from 'antd'
import Video from 'twilio-video'
import { useTranslation } from 'react-i18next'

interface IProps {
    participant: any
}

const { useState, useRef, useEffect } = React

const Participant = (props: IProps) => {
    const { participant } = props
    const { t } = useTranslation()

    const [videoTracks, setVideoTracks] = useState<any>([])
    const [audioTracks, setAudioTracks] = useState<any>([])
    const [isShare, setIsShare] = useState(false)

    const videoRef = useRef<any>()
    const audioRef = useRef<any>()

    const onShareScreen = () => {
        setIsShare(true)
    }

    const onStopShareScreen = () => {
        setIsShare(false)
    }

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication: any) => publication.track)
            .filter((track) => track !== null)

    useEffect(() => {
        if (isShare) {
            const mediaDevices = navigator.mediaDevices as any

            mediaDevices
                .getDisplayMedia()
                .then((stream) => {
                    const screenTrack = new Video.LocalVideoTrack(
                        stream.getTracks()[0]
                    )
                    participant.publishTrack(screenTrack)
                    setVideoTracks((old) => [screenTrack, ...old])
                })
                .catch(() => {
                    message.error(t(`Can't share screen!`))
                })
        } else {
            let screenTrack = videoTracks[0]

            if (screenTrack && participant) {
                participant.unpublishTrack(screenTrack)
                screenTrack.detach()
                setVideoTracks((videoTracks) =>
                    videoTracks.filter((v) => v !== screenTrack)
                )
            }

            screenTrack = videoTracks[0]

            if (screenTrack) {
                screenTrack.attach(videoRef.current)
            }
        }
    }, [isShare])

    useEffect(() => {
        const trackSubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks((videoTracks) => [track, ...videoTracks])
            } else {
                setAudioTracks((audioTracks) => [...audioTracks, track])
            }
        }

        const trackUnsubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks((videoTracks) =>
                    videoTracks.filter((v) => v !== track)
                )
            } else {
                setAudioTracks((audioTracks) =>
                    audioTracks.filter((a) => a !== track)
                )
            }
        }

        setVideoTracks(trackpubsToTracks(participant.videoTracks))
        setAudioTracks(trackpubsToTracks(participant.audioTracks))

        participant.on('trackSubscribed', trackSubscribed)
        participant.on('trackUnsubscribed', trackUnsubscribed)

        return () => {
            setVideoTracks([])
            setAudioTracks([])
            participant.removeAllListeners()
        }
    }, [participant])

    useEffect(() => {
        const videoTrack = videoTracks[0]
        if (videoTrack) {
            videoTrack.attach(videoRef.current)
            return () => {
                videoTrack.detach()
            }
        }
    }, [videoTracks])

    useEffect(() => {
        const audioTrack = audioTracks[0]
        if (audioTrack) {
            audioTrack.attach(audioRef.current)
            return () => {
                audioTrack.detach()
            }
        }
    }, [audioTracks])

    return (
        <div className="participant">
            <h3>{participant.identity}</h3>
            <Button onClick={onShareScreen}>{t('Share Screen')}</Button>
            <Button onClick={onStopShareScreen}>
                {t('Stop Share Screen')}
            </Button>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    )
}

export default Participant
