import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview'
import SettingsMenu from './SettingsMenu/SettingsMenu'
import { Steps } from '../PreJoinScreens'
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton'
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton'
import { useAppState } from '../../../state'
import useChatContext from '../../../hooks/useChatContext/useChatContext'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import React from 'react'
import { useTrans } from 'common'
import { Button, Col, Row, Space, Spin } from 'antd'

interface DeviceSelectionScreenProps {
    name: string
    roomName: string
    setStep: (step: Steps) => void
}

const DeviceSelectionScreen = (props: DeviceSelectionScreenProps) => {
    const { name, roomName, setStep } = props

    const { getToken, isFetching } = useAppState()
    const { connect: chatConnect } = useChatContext()
    const {
        connect: videoConnect,
        isAcquiringLocalTracks,
        isConnecting,
    } = useVideoContext()

    const trans = useTrans()
    const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting

    const handleJoin = () => {
        getToken(name, roomName).then((token) => {
            videoConnect(token)
            process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' &&
                chatConnect(token)
        })
    }

    if (isFetching || isConnecting) {
        return <Spin tip={trans('Loading...')} />
    }

    return (
        <Row style={{ width: 500 }}>
            <Col span={12}>
                <Space
                    direction={'vertical'}
                    style={{ width: '100%', margin: 'auto' }}
                >
                    <LocalVideoPreview identity={name} />
                    <SettingsMenu />
                </Space>
            </Col>
            <Col span={12}>
                <Row
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Space
                        direction={'vertical'}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <ToggleAudioButton disabled={disableButtons} />
                        <ToggleVideoButton disabled={disableButtons} />
                    </Space>
                    <Space style={{ margin: 'auto' }}>
                        <Button onClick={() => setStep(Steps.roomNameStep)}>
                            {trans('Cancel')}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={handleJoin}
                            disabled={disableButtons}
                        >
                            {trans('Join Now')}
                        </Button>
                    </Space>
                </Row>
            </Col>
        </Row>
    )
}

export default DeviceSelectionScreen
