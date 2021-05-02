import React from 'react'
import ChatInput from './ChatInput/ChatInput'
import MessageList from './MessageList/MessageList'
import useChatContext from '../../hooks/useChatContext/useChatContext'
import { Drawer } from 'antd'
import { useTrans } from 'common'

const ChatWindow = () => {
    const {
        isChatWindowOpen,
        messages,
        conversation,
        setIsChatWindowOpen,
    } = useChatContext()
    const trans = useTrans()
    return (
        <Drawer
            width={500}
            title={trans('Chat')}
            visible={isChatWindowOpen}
            onClose={() => setIsChatWindowOpen(false)}
        >
            <div
                style={{
                    marginBottom: 50,
                }}
            >
                <MessageList messages={messages} />
            </div>
            <ChatInput
                conversation={conversation!}
                isChatWindowOpen={isChatWindowOpen}
            />
        </Drawer>
    )
}

export default ChatWindow
