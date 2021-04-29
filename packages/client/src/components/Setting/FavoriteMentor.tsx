import { useAPI } from '../../utils/hooks/useAPI'
import * as React from 'react'
import { Row, Col, List, Avatar } from 'antd'

interface IFavoriteMentor {
    mentorId: string
    mentorName: string
    _id: string
}

const { useState, useEffect } = React

const FavoriteMentor = () => {
    const instance = useAPI()

    const [data, setData] = useState<IFavoriteMentor[]>([])

    useEffect(() => {
        instance
            .get('/api/users/favorite-mentor')
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data.results)
                }
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <Row gutter={24}>
            <Col span={24}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={item.mentorName}
                                description={'Mentor bio'}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default FavoriteMentor
