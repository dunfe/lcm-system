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
    List,
    Form,
    Input,
    Comment,
    Avatar,
} from 'antd'
import styled from 'styled-components'
import './SessionPage.css'
import RCE from '../../components/Session/RCE'
import VideoChat from '../../components/Session/VideoChat'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { useRole } from '../../utils/hooks/useRole'
import { useHistory, useParams } from 'react-router-dom'
import Report from '../../components/Session/Report'
import EndSessionFooter from '../../components/Session/EndSessionFooter'
import { IRoom } from '../../components/Session/Join'
import { useTrans } from 'common'
import { useFullname } from '../../utils/hooks/useFullname'
import Client, { Client as ConversationsClient } from '@twilio/conversations'
import ConversationsList from '../../components/Session/ConversationList'

interface IConversation {
    status: string
    statusString: string
    name: string
    loggedIn: boolean
    token: string
    conversationsReady: boolean
    conversations: any
    selectedConversationSid: string
    newMessage: string
}

interface IMessageList {
    messages: string[]
}

const { Sider, Content } = Layout
const { TabPane } = Tabs
const { TextArea } = Input
const { Text } = Typography

const { useState, useEffect } = React

const SessionPage = () => {
    const { t } = useTranslation()
    const { id } = useParams() as any
    const instance = useAPI()
    const role = useRole()
    const history = useHistory()
    const trans = useTrans()
    const name = useFullname()
    const loggedIn = name !== null

    const [connected, setConnected] = useState(true)
    const [rating, setRating] = useState(false)
    const [star, setStar] = useState(0)
    const [endMode, setEndMode] = useState('rate')
    const [roomDetail, setRoomDetail] = useState<IRoom>()
    const [videoCall, setVideoCall] = useState(false)
    const [conversation, setConversation] = useState<IConversation>({
        status: '',
        statusString: '',
        name: name!,
        loggedIn,
        token: '',
        conversationsReady: false,
        conversations: [],
        selectedConversationSid: '',
        newMessage: '',
    })
    const [conversationsClient, setConversationsClient] = useState<Client>()

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

    const handleChange = (event) => {
        setConversation({
            ...conversation,
            newMessage: event.target.value,
        })
    }

    const Editor = ({ onChange, onSubmit, value }) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    )

    const handleSendMessage = () => {
        const message = conversation.newMessage
        setConversation({
            ...conversation,
            newMessage: '',
        })
    }

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

    conversationsClient?.on('connectionStateChanged', (state) => {
        if (state === 'connecting')
            setConversation({
                ...conversation,
                statusString: 'Connecting to Twilio…',
                status: 'default',
            })
        if (state === 'connected') {
            setConversation({
                ...conversation,
                statusString: 'You are connected.',
                status: 'success',
            })
        }
        if (state === 'disconnecting')
            setConversation({
                ...conversation,
                statusString: 'Disconnecting from Twilio…',
                conversationsReady: false,
                status: 'default',
            })
        if (state === 'disconnected')
            setConversation({
                ...conversation,
                statusString: 'Disconnected.',
                conversationsReady: false,
                status: 'warning',
            })
        if (state === 'denied')
            setConversation({
                ...conversation,
                statusString: 'Failed to connect.',
                conversationsReady: false,
                status: 'error',
            })
    })
    conversationsClient?.on('conversationJoined', (thisConversation) => {
        setConversation({
            ...conversation,
            conversations: [...conversation.conversations, thisConversation],
        })
    })
    conversationsClient?.on('conversationLeft', (thisConversation) => {
        setConversation({
            ...conversation,
            conversations: conversation.conversations.filter(
                (it) => it !== thisConversation
            ),
        })
    })

    useEffect(() => {
        const initConversations = async () => {
            const _conversationsClient = await ConversationsClient.create(
                conversation.token
            )

            if (_conversationsClient) {
                setConversationsClient(_conversationsClient)
                setConversation({ ...conversation, status: 'Connected' })
            }
        }
        initConversations().then(() => {
            if (conversationsClient) {
                message.success(trans('Connected to room'))
            }
        })
    }, [])

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
                            {videoCall ? (
                                <VideoChat />
                            ) : (
                                <Button
                                    type={'primary'}
                                    onClick={() => setVideoCall(true)}
                                >
                                    {trans('Start video call')}
                                </Button>
                            )}
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
                    <>
                        {conversation.conversations.length > 0 && (
                            <ConversationsList
                                conversations={conversation.conversations}
                                onConversationClick={(item) => {
                                    setConversation({
                                        ...conversation,
                                        selectedConversationSid: item.sid,
                                    })
                                }}
                            />
                        )}
                        <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Editor
                                    onChange={handleChange}
                                    onSubmit={handleSendMessage}
                                    value={conversation.newMessage}
                                />
                            }
                        />
                    </>
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
