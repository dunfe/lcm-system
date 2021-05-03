import React from 'react'
import { Message } from '@twilio/conversations/lib/message'
import MediaMessage from './MediaMessage/MediaMessage'
import { Comment } from 'antd'

interface MessageListProps {
    messages: Message[]
}

const getFormattedTime = (message?: Message) =>
    message?.dateCreated
        .toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' })
        .toLowerCase()

export default function MessageList({ messages }: MessageListProps) {
    return (
        <>
            {messages.map((message) => {
                const time = getFormattedTime(message)!

                const content = () => {
                    if (message.type === 'media') {
                        return <MediaMessage media={message.media} />
                    } else {
                        return message.body
                    }
                }

                return (
                    <div key={message.sid}>
                        <Comment
                            author={message.author}
                            content={content()}
                            datetime={time}
                        />
                    </div>
                )
            })}
        </>
    )
}
