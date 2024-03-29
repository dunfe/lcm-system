import * as React from 'react'

import { useAuth } from '../../utils/hooks/useAuth'
import { passwordRule } from '../../utils/rules/passwordRule'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useFullnameRule } from 'common'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const SignUpComponent = () => {
    const history = useHistory()
    const auth = useAuth()
    const { t } = useTranslation()

    const onFinish = (values: any) => {
        const { username, email, password, display_name } = values

        auth.signUp(username, email, password, display_name)
            .then((response) => {
                if (response) {
                    message.success(t('Register successfully')).then(() => {
                        console.log(response)
                    })
                    history.push('/')
                }
            })
            .catch((error) => {
                message.error(t(`Can't register`) + error).then(() => {
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
                name="display_name"
                rules={useFullnameRule()}
            >
                <Input
                    width={'100%'}
                    placeholder={t('Fullname')}
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
                name="username"
                rules={[
                    {
                        pattern: new RegExp('(?=.{8,20}$)'),
                        message: t(
                            'Username must be between 8 and 20 character'
                        ),
                    },
                    {
                        pattern: new RegExp(
                            '^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
                        ),
                        message: t(
                            'Only use character or number in your username'
                        ),
                    },
                ]}
            >
                <Input
                    width={'100%'}
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
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: t('Invalid email'),
                    },
                    { required: true, message: t('Please enter your email') },
                ]}
            >
                <Input
                    placeholder="Email"
                    prefix={
                        <MailOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{ span: 24 }}
                name="password"
                rules={passwordRule(t)}
                hasFeedback
            >
                <Input.Password
                    placeholder={t('Password')}
                    prefix={
                        <LockOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{ span: 24 }}
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('Please re enter your password'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(t('Password need to match'))
                        },
                    }),
                ]}
            >
                <Input.Password
                    width={'100%'}
                    placeholder={t('Re password')}
                    prefix={
                        <LockOutlined
                            className="site-form-item-icon"
                            style={{ color: '#ff8e3c' }}
                        />
                    }
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{ span: 24 }}
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(t('Should accept agreement')),
                    },
                ]}
            >
                <Checkbox>
                    {t('I have read and agree to')}{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://l.facebook.com/l.php?u=https%3A%2F%2Fres.cloudinary.com%2Flcm-system-fpt%2Fimage%2Fupload%2Fv1620212767%2Fprivacy_xhw5as.pdf%3Ffbclid%3DIwAR0vplcUMqE6h0O-qMzAuWtty2wwOJu0Fu_Sjhkm04xtnV3-Xt1PXTsvl8E&h=AT3P4tDjkgIlAPYF-g_0njBhDH95ASUjrnKwpmuf_7dCaGkrW0Y8B2xA_7PWDusSDLZC5ZMkgNqQOVZF24IVHOe3r4ktcWOFyPfBDlQ9AT0CGP95BPuXUaDVcb18N0hYIf7eDg"
                    >
                        {t('The terms and conditions')}
                    </a>
                </Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <StyledButton type="primary" htmlType="submit">
                    {t('Register')}
                </StyledButton>
            </Form.Item>
        </Form>
    )
}

const StyledButton = styled(Button)`
    width: 100%;
`

export default SignUpComponent
