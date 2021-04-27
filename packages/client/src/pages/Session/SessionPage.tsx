import * as React from 'react'
import {
    Button,
    Card,
    Divider,
    Layout,
    message,
    Modal,
    Rate,
    Tabs,
    Typography,
} from 'antd'
import styled from 'styled-components'
import './SessionPage.css'
import RCE from '../../components/Session/RCE'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { useRole } from '../../utils/hooks/useRole'
import { useHistory, useParams } from 'react-router-dom'
import Report from '../../components/Session/Report'
import EndSessionFooter from '../../components/Session/EndSessionFooter'
import { IRoom } from '../../components/Session/Join'
import ConversationsApp from '../../components/Conversation/ConversationsApp'
import { useFullname } from '../../utils/hooks/useFullname'
import VideoApp from '../../components/Video'

const { Sider, Content } = Layout
const { TabPane } = Tabs
const { Text } = Typography

const { useState, useEffect } = React

const SessionPage = () => {
    const { t } = useTranslation()
    const { id } = useParams() as any
    const instance = useAPI()
    const role = useRole()
    const history = useHistory()
    const name = useFullname()

    const [connected, setConnected] = useState(true)
    const [rating, setRating] = useState(false)
    const [star, setStar] = useState(0)
    const [endMode, setEndMode] = useState('rate')
    const [roomDetail, setRoomDetail] = useState<IRoom>()
    const [token] = useState('')

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
            instance
                .post(`/api/users/colab-room/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        message.success(t('Ended')).then(() => {
                            history.push('/')
                        })
                    }
                })
                .catch((error) => message.error(error.response.data.message))
        } else {
            setEndMode('rate')
        }
    }

    useEffect(() => {
        if (star > 0) {
            instance
                .post(`/api/users/mentor/rate/${roomDetail?.mentorInfo._id}`, {
                    star,
                })
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

    useEffect(() => {
        if (id) {
            instance
                .get(`/api/users/colab-room/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setRoomDetail(response.data.data)
                    }
                })
                .catch((error) => message.error(error.response.data.message))
        } else {
            history.push('/session')
        }
    }, [id])

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
                            {roomDetail?._id ? (
                                <RCE id={roomDetail._id} />
                            ) : (
                                'Loading'
                            )}
                        </TabContent>
                    </TabPane>
                    <TabPane tab={t('Video/Audio Call')} key="2">
                        <TabContent>
                            <VideoApp />
                        </TabContent>
                    </TabPane>
                    <TabPane tab={t('Conversation')} key="3">
                        <TabContent>
                            <ConversationsApp name={name} token={token} />
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
                        height: 250,
                        margin: 'auto',
                        marginTop: 20,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text>Room: {id}</Text>
                        <Text>
                            Mentor: {roomDetail?.mentorInfo.displayName}
                        </Text>
                        <Text>
                            Mentee: {roomDetail?.menteeInfo.displayName}
                        </Text>
                    </div>

                    <Divider />
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
                    Chat
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
