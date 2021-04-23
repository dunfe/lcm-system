import * as React from 'react'
import { Button, Card, Layout, message, Modal, Rate, Tabs } from 'antd'
import styled from 'styled-components'
import './SessionPage.css'
import RCE from '../../components/Session/RCE'
import VideoChat from '../../components/Session/VideoChat'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { useRole } from '../../utils/hooks/useRole'
import { useHistory } from 'react-router-dom'
import Report from '../../components/Session/Report'
import EndSessionFooter from '../../components/Session/EndSessionFooter'

const { Sider, Content } = Layout
const { TabPane } = Tabs

const { useState, useEffect } = React
const SessionPage = () => {
    const { t } = useTranslation()
    const instance = useAPI()
    const role = useRole()
    const history = useHistory()

    const [connected, setConnected] = useState(true)
    const [rating, setRating] = useState(false)
    const [star, setStar] = useState(0)
    const [endMode, setEndMode] = useState('rate')

    const handleDisconnect = () => {
        if (role === 'mentee') {
            setRating(true)
        } else {
            setConnected(false)
        }
    }

    const handleConnect = () => {
        setConnected(true)
    }

    const handleStarChange = (_star) => {
        setStar(_star)
    }

    const handleCancelRate = () => {
        setRating(false)
    }

    const handleReport = () => {
        if (endMode === 'rate') {
            setEndMode('report')
        }
    }

    const handleOk = () => {
        if (endMode === 'rate') {
            setRating(false)
            setConnected(false)
            history.push('/')
        } else {
            setEndMode('rate')
        }
    }

    useEffect(() => {
        if (star > 0) {
            instance
                .post(`/api/users/mentor/rate/mentorId`)
                .then((response) => {
                    if (response.status === 200) {
                        message.success(t('Rated'))
                    } else {
                        message.error(t('Failed'))
                    }
                })
                .catch((error) => console.error(error))
        }
    }, [star])

    return (
        <Layout className="session-layout">
            <Content
                style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginBottom: 20,
                    height: 'calc(100vh - 40px)',
                    backgroundColor: 'white',
                }}
            >
                <Modal
                    width={800}
                    visible={rating}
                    footer={
                        <EndSessionFooter
                            handleReport={handleReport}
                            handleOk={handleOk}
                            endMode={endMode}
                        />
                    }
                    onCancel={handleCancelRate}
                    title={
                        endMode === 'rate'
                            ? t('Please rate this mentor')
                            : t('Report this mentor')
                    }
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    {endMode === 'rate' ? (
                        <Rate
                            value={star}
                            style={{
                                fontSize: 80,
                            }}
                            onChange={handleStarChange}
                        />
                    ) : (
                        <Report />
                    )}
                </Modal>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('Real-time Collaborative Editor')} key="1">
                        <TabContent>
                            <RCE />
                        </TabContent>
                    </TabPane>
                    <TabPane tab={t('Video/Audio Call')} key="2">
                        <TabContent>
                            <VideoChat />
                        </TabContent>
                    </TabPane>
                </Tabs>
            </Content>
            <Sider width={342} className={'session-sider'}>
                <Card
                    className={'session-time'}
                    title={t('Session')}
                    bordered={false}
                    style={{
                        width: 302,
                        height: 182,
                        margin: 'auto',
                        marginTop: 20,
                    }}
                >
                    {connected ? (
                        <Button onClick={handleDisconnect}>
                            {t('Disconnect')}
                        </Button>
                    ) : (
                        <Button onClick={handleConnect}>{t('Connect')}</Button>
                    )}
                </Card>
                <Card
                    className={'session-chat'}
                    title={t('Chat')}
                    bordered={false}
                    style={{
                        width: 302,
                        margin: 'auto',
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    {t('Chat')}
                </Card>
            </Sider>
        </Layout>
    )
}

const TabContent = styled.div`
    background-color: white;
    height: 100%;
`

export default SessionPage
