import * as React from "react";
import {useAuth} from "../../utils/hooks/useAuth";
import Room from "./Room";
import axios from "axios";

const {useEffect, useState} = React;

const VideoChat = () => {
    const auth = useAuth();
    const [token, setToken] = useState('');
    const roomName = 'room'

    // const handleLogout = useCallback((event) => {
    //     setToken(null);
    // }, []);

    useEffect(() => {
        axios.post('https://t.livecoding.me/video/token', {
            identity: auth.user?.user.data.username,
            room: roomName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setToken(response.data.token);
        })
    }, []);

    return (
        <Room token={token} roomName={roomName}/>
    )
};

export default VideoChat;
