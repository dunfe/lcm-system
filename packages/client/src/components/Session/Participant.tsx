import * as React from "react";

interface IProps {
    participant: any;
}
const { useState, useRef, useEffect } = React;

const Participant = (props: IProps) => {
    const {participant} = props;

    const [videoTracks, setVideoTracks] = useState<any>([]);
    const [audioTracks, setAudioTracks] = useState<any>([]);

    const videoRef = useRef<any>();
    const audioRef = useRef<any>();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication: any) => publication.track)
            .filter((track) => track !== null);

    useEffect(() => {
        const trackSubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks((videoTracks) => [...videoTracks, track]);
            } else {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
            } else {
                setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            }
        };

        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', trackSubscribed);
        participant.on('trackUnsubscribed', trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
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
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    )
};

export default Participant;
