import Menu from './Menu/Menu'
import EndCallButton from '../Buttons/EndCallButton/EndCallButton'
import useRoomState from '../../hooks/useRoomState/useRoomState'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton'
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton'
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton'
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton'
import React from 'react'
import { Row, Col, Typography, Space } from 'antd'

const { Text } = Typography
const MenuBar = () => {
    const roomState = useRoomState()
    const isReconnecting = roomState === 'reconnecting'
    const { room } = useVideoContext()

    return (
        <Row
            align={'middle'}
            justify={'center'}
            style={{
                background: 'white',
                height: 50,
                display: 'fixed',
                bottom: 0,
            }}
        >
            <Col
                span={6}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Text
                    style={{
                        paddingLeft: 24,
                    }}
                >
                    Room: {room!.name}
                </Text>
            </Col>
            <Col flex="auto">
                <Space>
                    <ToggleAudioButton disabled={isReconnecting} />
                    <ToggleVideoButton disabled={isReconnecting} />
                    <ToggleScreenShareButton disabled={isReconnecting} />
                    <ToggleChatButton />
                </Space>
            </Col>
            <Col
                span={6}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 24,
                }}
            >
                <Menu />
                <EndCallButton />
            </Col>
        </Row>
    )
}

export default MenuBar
