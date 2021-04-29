import React, { PropsWithChildren } from 'react'
import enhanceMessage from './enhanceMessage'
import { TwilioError } from 'twilio-video'
import { Modal, Typography } from 'antd'

interface ErrorDialogProps {
    dismissError: any
    error: TwilioError | Error | null
}

const { Text, Title } = Typography

function ErrorDialog({
    dismissError,
    error,
}: PropsWithChildren<ErrorDialogProps>) {
    const { message, code } = error || {}
    const enhancedMessage = enhanceMessage(message, code)

    return (
        <Modal
            visible={error !== null}
            onCancel={() => dismissError()}
            onOk={() => dismissError()}
        >
            <Title>ERROR</Title>
            <Text>{enhancedMessage}</Text>
            {Boolean(code) && (
                <pre>
                    <code>Error Code: {code}</code>
                </pre>
            )}
        </Modal>
    )
}

export default ErrorDialog
