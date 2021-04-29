import useChatContext from '../../../hooks/useChatContext/useChatContext'
import React from 'react'
import { Button } from 'antd'
import { useTrans } from 'common'
import { MessageOutlined } from '@ant-design/icons'

export const ANIMATION_DURATION = 700

export default function ToggleChatButton() {
    const {
        isChatWindowOpen,
        setIsChatWindowOpen,
        conversation,
    } = useChatContext()
    const trans = useTrans()

    const toggleChatWindow = () => {
        setIsChatWindowOpen(!isChatWindowOpen)
    }

    return (
        <Button
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            type={'text'}
            data-cy-chat-button
            onClick={toggleChatWindow}
            disabled={!conversation}
            icon={<MessageOutlined />}
        >
            {trans('Chat')}
        </Button>
    )
}
