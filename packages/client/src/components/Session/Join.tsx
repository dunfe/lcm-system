import * as React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useAPI } from '../../utils/hooks/useAPI'
import { useTranslation } from 'react-i18next'

const Join = () => {
    const history = useHistory()
    const instance = useAPI()
    const { t } = useTranslation()

    const handleJoin = () => {
        instance.get(`http://localhost:5000/join`).then((res) => {
            history.push(`/session/${res.data.link}?`)
        })
    }
    return <Button onClick={handleJoin}>{t('Join')}</Button>
}

export default Join
