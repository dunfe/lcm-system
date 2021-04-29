import { getUserDetail, selectUser } from './userSlice'
import { useAPI } from '../../utils/hooks/useAPI'
import { useToken } from '../../utils/hooks/useToken'
import * as React from 'react'
import { Row, Col, Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Line, Pie } from '@ant-design/charts'

const { useEffect, useState } = React
const { Title } = Typography
const Dashboard = () => {
    const { t } = useTranslation()
    const instance = useAPI()
    const dispatch = useDispatch()
    const token = useToken()

    const [questions, setQuestions] = useState({
        line: [],
        pie: [],
    })
    const user = useSelector(selectUser)

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
                    setQuestions({
                        line: response.data.data.lineTableQuestion,
                        pie: response.data.data.circleQuestion,
                    })
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
                                <Title>{user?.currentPoint}</Title>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={t('This month questions')}
                                bordered={false}
                            >
                                <Line {...questionsLineConfig} />
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
                        <Pie {...questionsPieConfig} />
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
