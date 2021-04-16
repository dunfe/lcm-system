import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { passwordRule } from '../../utils/rules/passwordRule'
import { useAPI } from '../../utils/hooks/useAPI'
import { useUserId } from '../../utils/hooks/useUserId'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
}

const SecuritySetting = () => {
    const { t } = useTranslation()
    const instance = useAPI()
    const id = useUserId()

    const onFinish = (values: any) => {
        const { newPassword } = values

        if (newPassword) {
            instance
                .post(`/api/users/${id}/admin`)
                .then((response) => {
                    if (response.status === 200) {
                        message.success(t('Change Successfully'))
                    } else {
                        message.error(t('Failed'))
                    }
                })
                .catch((error) => console.error(error))
        }
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label={t('Old password')}
                name="password"
                rules={[
                    {
                        required: true,
                        message: t('Please input your password!'),
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="newPassword"
                rules={passwordRule(t)}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('Please confirm your password!'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    t(
                                        'The two passwords that you entered do not match!'
                                    )
                                )
                            )
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {t('Change password')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SecuritySetting
