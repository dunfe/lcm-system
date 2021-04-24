import * as React from 'react'
import { Button, List, Space } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'
import { useTranslation } from 'react-i18next'
import { PlayCircleOutlined } from '@ant-design/icons'

interface IRoom {
    menteeInfo: {
        _id: string
        displayName: string
        level: number
    }
    mentorInfo: {
        _id: string
        displayName: string
        level: number
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

    const onJoin = (id: string) => {
        console.log(id)
    }

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
                        <Button key={item._id} onClick={() => onJoin(item._id)}>
                            <IconText
                                icon={PlayCircleOutlined}
                                text={t('Join session')}
                                key={item._id}
                            />
                        </Button>,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
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
