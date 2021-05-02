import * as React from 'react'

import { useAuth } from '../../utils/hooks/useAuth'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface IProps {
    setActiveKey: (state: string) => void
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const SignInComponent = (props: IProps) => {
    const { setActiveKey } = props
    const history = useHistory()
    const auth = useAuth()
    const { t } = useTranslation()

    const onFinish = (values: any) => {
        const { username, password } = values

        auth.signIn(username, password)
            .then((response) => {
                if (response) {
                    message.success(t('Login successfully')).then(() => {
                        console.log(response)
                    })

                    history.push('/')
                }
            })
            .catch((error) => {
                message.error(t(`Can't Login`)).then(() => {
                    console.error(error)
                })
            })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(t('Failed'), errorInfo)
    }

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
                name="username"
                rules={[
                    {
                        required: true,
                        message: t('Please enter your username'),
                    },
                ]}
            >
                <Input
                    placeholder={t('Username')}
                    prefix={
                        <UserOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 24 }}
                name="password"
                rules={[
                    {
                        required: true,
                        message: t('Please enter your password'),
                    },
                ]}
            >
                <Input.Password
                    width={'100%'}
                    placeholder={t('Password')}
                    prefix={
                        <LockOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{t('Remember me')} </Checkbox>
                </Form.Item>

                <a onClick={() => setActiveKey('3')} style={{ float: 'right' }}>
                    {t('Forgot password?')}
                </a>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <StyledButton type="primary" htmlType="submit">
                    {t('Login')}
                </StyledButton>
            </Form.Item>
        </Form>
    )
}

const StyledButton = styled(Button)`
    width: 100%;
`

export default SignInComponent
