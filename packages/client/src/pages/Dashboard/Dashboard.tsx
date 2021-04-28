import * as React from 'react'
import { Row, Col, Card, Table, message, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { IQuestion } from '../Question/questionSlice'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import { status } from '../../utils/status'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail, selectUser } from './userSlice'
import { useToken } from '../../utils/hooks/useToken'

const { useEffect, useState } = React
const { Title } = Typography
const Dashboard = () => {
    const { t } = useTranslation()
    const instance = useAPI()
    const dispatch = useDispatch()
    const token = useToken()

    const [data, setData] = useState<IQuestion[]>([])
    const user = useSelector(selectUser)

    const columns = [
        {
            title: t('No'),
            width: '5%',
            render(text, record, index) {
                return index + 1
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: t('Title'),
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: t('Point'),
            dataIndex: 'point',
            key: 'point',
            sorter: (a, b) => a.point - b.point,
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return status.map((item) => {
                    if (item.value === record.status) {
                        return (
                            <Tag color={item.color} key={record._id}>
                                {record.status.toUpperCase()}
                            </Tag>
                        )
                    }
                })
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    useEffect(() => {
        instance
            .get('/api/users/questions')
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data.results)
                }
            })
            .catch((error) => message.error(error.message))
    }, [])

    useEffect(() => {
        if (!user && token) {
            dispatch(getUserDetail({ token }))
        }
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={18}>
                        <Col span={8}>
                            <Card title={t('Balance')} bordered={false}>
                                <Title>{user?.currentPoint}</Title>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={t('This month questions')}
                                bordered={false}
                            >
                                <Title>10</Title>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={t('Favorite Mentor')} bordered={false}>
                                <Title> {user?.favoriteMentor.length}</Title>
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        title={t('Questions')}
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
                        title={t('Guide')}
                        bordered={false}
                        style={{ height: '90vh' }}
                    >
                        <h3>{t('Content')}</h3>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
