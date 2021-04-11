import * as React from "react";
import {Button, message} from "antd";
import Video from "twilio-video";

interface IProps {
    participant: any;
}

/** Provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data. */
interface MediaDevices extends EventTarget {
    ondevicechange: ((this: MediaDevices, ev: Event) => any) | null;
    enumerateDevices(): Promise<MediaDeviceInfo[]>;
    getSupportedConstraints(): MediaTrackSupportedConstraints;
    getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
    addEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

const { useState, useRef, useEffect } = React;

const Participant = (props: IProps) => {
    const {participant} = props;

    const [videoTracks, setVideoTracks] = useState<any>([]);
    const [audioTracks, setAudioTracks] = useState<any>([]);
    const [screenTracks, setScreenTracks] = useState<any>([]);

    const videoRef = useRef<any>();
    const audioRef = useRef<any>();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication: any) => publication.track)
            .filter((track) => track !== null);

    const onShareScreen = () => {
        const mediaDevices = navigator.mediaDevices as any;
        mediaDevices.getDisplayMedia().then(stream => {
            const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
            participant.publishTrack(screenTrack);
        }).catch(() => {
            message.error('Không thể share màn hình!')
        });
    }

    useEffect(() => {
        const trackSubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks((videoTracks) => [...videoTracks, track]);
            } else if (track.kind === 'screen') {
                setScreenTracks((screenTracks) => [...screenTracks, track]);
            } else {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
            } else if (track.kind === 'screen') {
                setScreenTracks((screenTracks) => screenTracks.filter(s => s !== track));
            } else {
                setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            }
        };

        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setScreenTracks(trackpubsToTracks(participant.screenTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', trackSubscribed);
        participant.on('trackUnsubscribed', trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            setScreenTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {
        const screenTrack = screenTracks[0];
        if (screenTrack) {
            screenTrack.attach(videoRef.current);
            return () => {
                screenTrack.detach();
            };
        }
    }, [screenTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <div className="participant">
            <h3>{participant.identity}</h3>
            <Button onClick={onShareScreen}>Share Screen</Button>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    )
};

export default Participant;
