import * as React from 'react'
import { Row, Col, Card, Table, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { IQuestion } from '../Question/questionSlice'

const { useEffect, useState } = React

const Dashboard = () => {
    const { t } = useTranslation()
    const instance = useAPI()

    const [data, setData] = useState<IQuestion[]>([])

    const columns = [
        {
            title: t('Title'),
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: 500,
        },
        {
            title: t('Point'),
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
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

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={18}>
                        <Col span={8}>
                            <Card title={t('Balance')} bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={t('This month questions')}
                                bordered={false}
                            >
                                {t('This month questions')}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={t('Favorite Mentor')} bordered={false}>
                                Số mentor yêu thích
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
