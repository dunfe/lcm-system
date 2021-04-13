import * as React from 'react'
import { Row, Col, Card, Table, message } from 'antd'
import { useAuth } from '../../utils/hooks/useAuth'
import axios from 'axios'
import { IData } from '../Question/ListQuestion'

const { useEffect, useState } = React

const columns = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
        width: 500,
    },
    {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
]

const Dashboard = () => {
    const auth = useAuth()

    const [data, setData] = useState<IData[]>([])

    const instance = axios.create({ baseURL: 'https://livecoding.me' })

    useEffect(() => {
        instance
            .get('/api/users/questions', {
                headers: {
                    Authorization: auth.user?.user.token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data.results)
                }
            })
            .catch((error) => message.error(error.message))
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={18}>
                        <Col span={8}>
                            <Card title="Số dư" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Câu hỏi tháng này" bordered={false}>
                                Câu hỏi tháng này
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Số mentor yêu thích" bordered={false}>
                                Số mentor yêu thích
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        title="Danh sách câu hỏi"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey={'_id'}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="Hướng dẫn sử dụng"
                        bordered={false}
                        style={{ height: '90vh' }}
                    ></Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
