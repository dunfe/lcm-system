import React from 'react'
import { Button, Col, Row, Space, Typography } from 'antd'
import { useTrans } from 'common'

interface RoomNameScreenProps {
    name: string
    roomName: string
    handleSubmit: () => void
}

const { Title, Text } = Typography

const RoomNameScreen = (props: RoomNameScreenProps) => {
    const { name, roomName, handleSubmit } = props
    const trans = useTrans()

    return (
        <Space direction="vertical">
            <Row>
                <Col>
                    <Space direction={'vertical'}>
                        <Title level={5}>
                            {trans('Joining ')} {roomName}
                        </Title>
                        <Text>
                            {trans('Your name')} : {name}
                        </Text>
                        <Button
                            onClick={handleSubmit}
                            type={'primary'}
                            style={{ width: '100%' }}
                        >
                            {trans('Continue')}
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Space>
    )
}

export default RoomNameScreen
