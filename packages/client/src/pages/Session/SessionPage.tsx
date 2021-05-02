import * as React from 'react'
import { Button, Layout, message, Modal, Rate, Tabs } from 'antd'
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
import VideoApp from '../../components/Video'

const { Content } = Layout
const { TabPane } = Tabs

const { useState, useEffect } = React

const SessionPage = () => {
    const { t } = useTranslation()
    const { id } = useParams() as any
    const instance = useAPI()
    const role = useRole()
    const history = useHistory()

    const [connected, setConnected] = useState(true)
    const [rating, setRating] = useState(false)
    const [star, setStar] = useState(0)
    const [endMode, setEndMode] = useState('rate')
    const [roomDetail, setRoomDetail] = useState<IRoom>()

    const handleDisconnect = () => {
        if (role === 'mentee') {
            setRating(true)
        } else {
            setConnected(false)
        }
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
        console.log(connected)
    }, [connected])

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
                    margin: 24,
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
                <Tabs defaultActiveKey="1" className={'session-tab'}>
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
                </Tabs>
            </Content>
            <Button
                danger
                onClick={handleDisconnect}
                style={{ position: 'absolute', top: 30, right: 30 }}
            >
                {t('End session')}
            </Button>
        </Layout>
    )
}

const TabContent = styled.div`
    background-color: white;
    height: 100%;
`

export default SessionPage
