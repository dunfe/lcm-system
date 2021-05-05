import { getUserDetail, selectUser } from './userSlice'
import { useAPI } from '../../utils/hooks/useAPI'
import { useToken } from '../../utils/hooks/useToken'
import * as React from 'react'
import { Row, Col, Card, Typography, Space, Rate } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Line, Pie } from '@ant-design/charts'
import Guide from './Guide'
import { useRole } from '../../utils/hooks/useRole'

const { useEffect, useState } = React
const { Title } = Typography
const Dashboard = () => {
    const { t } = useTranslation()
    const instance = useAPI()
    const dispatch = useDispatch()
    const token = useToken()
    const role = useRole()

    const [questions, setQuestions] = useState({
        line: [],
        pie: [],
    })
    const [points, setPoints] = useState({
        points: [],
        currentPoint: 0,
    })
    const user = useSelector(selectUser)

    const pointsLineConfig = {
        data: points.points,
        xField: 'date',
        yField: 'point',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const questionsLineConfig = {
        data: questions.line,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const questionsPieConfig = {
        data: questions.pie,
        angleField: 'count',
        colorField: 'status',
    }

    useEffect(() => {
        if (!user && token) {
            dispatch(getUserDetail({ token }))
        }

        instance
            .get('/api/users/dashboard')
            .then((response) => {
                if (response.status === 200) {
                    const {
                        lineTableQuestion,
                        circleQuestion,
                        lineTablePoint,
                        currentPoint,
                    } = response.data.data

                    if (
                        Array.isArray(lineTableQuestion) &&
                        Array.isArray(circleQuestion)
                    ) {
                        setQuestions({
                            line: response.data.data.lineTableQuestion,
                            pie: response.data.data.circleQuestion,
                        })
                    }

                    if (Array.isArray(lineTablePoint) && currentPoint) {
                        setPoints({
                            points: response.data.data.lineTablePoint,
                            currentPoint: response.data.data.currentPoint,
                        })
                    }
                }
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={18}>
                        <Col span={8}>
                            <Card title={t('Balance')} bordered={false}>
                                <Title>{points.currentPoint}</Title>
                                <Line {...pointsLineConfig} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={t('This month questions')}
                                bordered={false}
                            >
                                <Title>{questions?.line?.length}</Title>
                                <Line {...questionsLineConfig} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={t('Favorite Mentor')}
                                bordered={false}
                                style={{ height: '100%' }}
                            >
                                {role === 'mentee' ? (
                                    <Title>{user?.favoriteMentor.length}</Title>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Space>
                                            <Rate value={5} />{' '}
                                            {user?.rate.totalRating5}
                                        </Space>
                                        <Space>
                                            <Rate value={4} />{' '}
                                            {user?.rate.totalRating4}
                                        </Space>
                                        <Space>
                                            <Rate value={3} />{' '}
                                            {user?.rate.totalRating3}
                                        </Space>
                                        <Space>
                                            <Rate value={2} />{' '}
                                            {user?.rate.totalRating2}
                                        </Space>
                                        <Space>
                                            <Rate value={1} />{' '}
                                            {user?.rate.totalRating1}
                                        </Space>
                                    </div>
                                )}
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        title={t('Questions')}
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <Pie {...questionsPieConfig} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={t('Guide')} bordered={false}>
                        <Guide />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
