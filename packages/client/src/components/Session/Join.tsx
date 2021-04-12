import * as React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useAPI } from '../../utils/hooks/useAPI'

const Join = () => {
    const history = useHistory()
    const instance = useAPI()

    const handleJoin = () => {
        instance.get(`http://localhost:5000/join`).then((res) => {
            history?.push(`/session/${res.data.link}?`)
        })
    }
    return <Button onClick={handleJoin}>Join</Button>
}

export default Join
