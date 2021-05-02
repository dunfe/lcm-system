import React from 'react'
import { Conversation } from '@twilio/conversations/lib/conversation'
import { Button, Input, message } from 'antd'
import { useTrans } from 'common'
import { LinkOutlined } from '@ant-design/icons'

interface ChatInputProps {
    conversation: Conversation
    isChatWindowOpen: boolean
}

const { useEffect, useRef, useState } = React

const ALLOWED_FILE_TYPES =
    'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv'

export default function ChatInput({ conversation }: ChatInputProps) {
    const [messageBody, setMessageBody] = useState('')
    const [isSendingFile, setIsSendingFile] = useState(false)
    const [fileSendError, setFileSendError] = useState<string | null>(null)
    const isValidMessage = /\S/.test(messageBody)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const trans = useTrans()

    const handleChange = (event) => {
        setMessageBody(event.target.value)
    }

    const handleReturnKeyPress = (event: React.KeyboardEvent) => {
        event.preventDefault()
        handleSendMessage(messageBody)
    }

    const handleSendMessage = (message: string) => {
        if (isValidMessage) {
            conversation.sendMessage(message.trim())
            setMessageBody('')
        }
    }

    const handleSendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('userfile', file)
            setIsSendingFile(true)
            setFileSendError(null)
            conversation
                .sendMessage(formData)
                .catch((e) => {
                    if (e.code === 413) {
                        setFileSendError(
                            'File size is too large. Maximum file size is 150MB.'
                        )
                    } else {
                        setFileSendError(
                            'There was a problem uploading the file. Please try again.'
                        )
                    }
                    console.log('Problem sending file: ', e)
                })
                .finally(() => {
                    setIsSendingFile(false)
                })
        }
    }

    useEffect(() => {
        if (fileSendError) {
            message.error(trans('Failed to send file'))
        }
    }, [fileSendError])

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 450,
                height: 50,
                background: 'white',
            }}
        >
            <Button
                style={{
                    marginRight: 12,
                }}
                onClick={() => fileInputRef.current?.click()}
                shape="circle"
                icon={<LinkOutlined />}
                loading={isSendingFile}
            />
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleSendFile}
                value={''}
                accept={ALLOWED_FILE_TYPES}
            />
            <Input
                value={messageBody}
                onChange={handleChange}
                placeholder={trans('Type something')}
                onPressEnter={handleReturnKeyPress}
            />
            <Button
                type="primary"
                onClick={() => handleSendMessage(messageBody)}
                disabled={!isValidMessage}
                data-cy-send-message-button
            >
                {trans('Send')}
            </Button>
        </div>
    )
}
