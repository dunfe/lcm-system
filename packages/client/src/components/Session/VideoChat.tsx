import * as React from 'react'
import Room from './Room'
import { useAPI } from '../../utils/hooks/useAPI'
import { useUsername } from '../../utils/hooks/useUsername'

interface IProps {
    token: string
    setToken: (state: string) => void
}
const { useEffect } = React

const VideoChat = (props: IProps) => {
    const { token, setToken } = props
    const instance = useAPI()
    const username = useUsername()
    const roomName = 'room'

    // const handleLogout = useCallback((event) => {
    //     setToken(null);
    // }, []);

    useEffect(() => {
        instance
            .post(
                'https://t.livecoding.me/video/token',
                {
                    identity: username,
                    room: roomName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setToken(response.data.token)
            })
    }, [])

    return <Room token={token} roomName={roomName} />
}

export default VideoChat
