import * as React from 'react'
import { Row, Col, List, Card } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'

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
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.mentorName}>Card content</Card>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default FavoriteMentor
