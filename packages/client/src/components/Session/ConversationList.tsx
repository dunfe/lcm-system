import * as React from 'react'
import { List, Typography } from 'antd'

interface IProps {
    conversations: any
    onConversationClick: (state: any) => void
}

const { Text } = Typography

const ConversationsList = (props: IProps) => {
    const { conversations, onConversationClick } = props

    return (
        <List
            header={'Open Conversations'}
            bordered={true}
            loading={conversations.length === 0}
            dataSource={conversations}
            renderItem={(item: any) => {
                return (
                    <List.Item
                        key={item.sid}
                        onClick={() => onConversationClick(item)}
                    >
                        <Text strong>{item.friendlyName || item.sid}</Text>
                    </List.Item>
                )
            }}
        />
    )
}

export default ConversationsList
