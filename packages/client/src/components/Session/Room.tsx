import * as React from "react";
import Video from "twilio-video";
import Participant from "./Participant";

interface IProps {
    token: string;
    roomName: string;
}

const { useState, useEffect } = React;
const Room = (props: IProps) => {
    const {roomName, token} = props;
    const [room, setRoom] = useState<Video.Room>();
    const [participants, setParticipants] = useState<{sid: string; identity: string}[]>([]);

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };

        if (token !== '') {
            Video.connect(token, {
                name: roomName
            }).then(room => {
                setRoom(room);
                room.on('participantConnected', participantConnected);
                room.on('participantDisconnected', participantDisconnected);
                room.participants.forEach(participantConnected);
            }).catch((error) => console.error(error));
        }

        return () => {
            setRoom((currentRoom) => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach((trackPublication: any) => {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return undefined;
                } else {
                    return currentRoom;
                }
            });
        }
    }, [roomName, token]);

    return (
        <div className={'room'}>
            <div className="local-participant">
                {room ? (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                    ''
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    )
};

export default Room;
