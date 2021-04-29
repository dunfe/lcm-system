import useRoomState from '../../hooks/useRoomState/useRoomState'
import React from 'react'
import { notification } from 'antd'

const { useEffect } = React
export default function ReconnectingNotification() {
    const roomState = useRoomState()

    useEffect(() => {
        if (roomState === 'reconnecting') {
            notification.warning({
                message: 'Connection Lost',
                description: 'Reconnecting to room...',
            })
        }
    })

    return <></>
}
