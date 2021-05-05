import * as React from 'react'

import { useAPI } from '../../utils/hooks/useAPI'
import { Button, Form, Input, message } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface IProps {
    setActiveKey: (state: string) => void
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const { useState, useEffect } = React

const ForgotPassword = (props: IProps) => {
    const { setActiveKey } = props
    const { t } = useTranslation()
    const instance = useAPI()
    const [count, setCount] = useState(60)
    const [wait, setWait] = useState(false)

    const onFinish = (values: any) => {
        if (wait) {
            return
        }

        const { email } = values

        if (email) {
            setWait(true)

            instance
                .post('/api/users/forgot-password', {
                    email,
                })
                .then((response) => {
                    if (response.status === 200) {
                        setWait(false)
                        setCount(60)
                        message.success(response.data.message).then(() => {
                            setActiveKey('1')
                        })
                    }
                })
                .catch((error) => {
                    setWait(false)
                    setCount(60)
                    message.error(error.response.data.message)
                })
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(t('Failed'), errorInfo)
    }

    useEffect(() => {
        setTimeout(() => {
            setCount(count - 1)
        }, 1000)
    }, [wait])

    useEffect(() => {
        if (count === 0) {
            setWait(false)
            setCount(60)
        }
    }, [count])

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                wrapperCol={{ span: 24 }}
                name="email"
                rules={[
                    {
                        required: true,
                        message: t('Please enter your email'),
                    },
                ]}
            >
                <Input
                    placeholder={t('Email')}
                    prefix={
                        <MailOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <StyledButton type="primary" htmlType="submit" loading={wait}>
                    {wait ? `wait ${count}s` : t('Reset')}
                </StyledButton>
            </Form.Item>
        </Form>
    )
}

const StyledButton = styled(Button)`
    width: 100%;
`

export default ForgotPassword
