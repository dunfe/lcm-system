import * as React from 'react'

import { useAPI } from '../../utils/hooks/useAPI'
import { List, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export interface IRoom {
    menteeInfo: {
        _id: string
        displayName: string
        level: number
        avatar: string
    }
    mentorInfo: {
        _id: string
        displayName: string
        level: number
        avatar: string
    }
    questionInfo: {
        _id: string
        title: string
        content: string
    }
    createAt: string
    _id: string
    __v: number
}

const { useState, useEffect } = React

const Join = () => {
    const instance = useAPI()
    const { t } = useTranslation()

    const [data, setData] = useState<IRoom[]>([])

    const IconText = ({ icon, text }: { icon: any; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    )

    useEffect(() => {
        instance
            .get('/api/users/colab-room')
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data.results)
                }
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item._id}
                    actions={[
                        <Link key={item._id} to={`/room/${item._id}`}>
                            <IconText
                                icon={PlayCircleOutlined}
                                text={t('Join session')}
                                key={item._id}
                            />
                        </Link>,
                    ]}
                    extra={
                        item.mentorInfo.avatar ? (
                            <img
                                width={272}
                                alt="avatar"
                                src={item.mentorInfo.avatar}
                            />
                        ) : null
                    }
                >
                    <List.Item.Meta title={item.questionInfo.title} />
                    {item.questionInfo.content}
                </List.Item>
            )}
        />
    )
}

export default Join
