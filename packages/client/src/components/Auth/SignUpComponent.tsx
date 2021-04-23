import { Button, Checkbox, Form, Input, message } from 'antd'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../utils/hooks/useAuth'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { passwordRule } from '../../utils/rules/passwordRule'

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
            <Form.Item wrapperCol={{ span: 24 }} name="display_name">
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
                    <a href="">{t('The terms and conditions')}</a>
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
