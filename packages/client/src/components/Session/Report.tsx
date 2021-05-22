import * as React from 'react'

import { useToken } from '../../utils/hooks/useToken'
import { useAPI } from '../../utils/hooks/useAPI'
import { Button, Form, Input, message, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import { UploadOutlined } from '@ant-design/icons'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const { useState } = React

const Report = () => {
    const token = useToken()
    const instance = useAPI()
    const [url, setUrl] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()

    const onFinish = (values) => {
        const _values = { ...values, url }
        instance
            .post('/api/users/reports', _values)
            .then(() => {
                message.success(t('Reported'))
            })
            .catch((error) => console.error(error))
    }

    const upload = {
        name: 'img',
        action: 'http://localhost:3000/api/users/reports/upload-file',
        headers: {
            Authorization: token!,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setLoading(true)
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                setUrl([...url, info.file.response.url])
            } else if (info.file.status === 'error') {
                setLoading(false)
            }
        },
    }

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error(t('You can only upload JPG/PNG file!'))
        }
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
            message.error(t('Image must smaller than 1MB!'))
        }

        return isJpgOrPng && isLt2M
    }

    return (
        <Form {...layout} name="report" onFinish={onFinish}>
            <Form.Item
                label={t('Title')}
                name="title"
                rules={[
                    {
                        required: true,
                        message: t('Please input title!'),
                    },
                    {
                        max: 50,
                        message: t('Title must not longer than 50 character'),
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label={t('Content')} name="content">
                <Input.TextArea />
            </Form.Item>

            <Form.Item label={t('Image')} name="url">
                <Upload
                    {...upload}
                    className="avatar-uploader"
                    beforeUpload={beforeUpload}
                >
                    <Button loading={loading} icon={<UploadOutlined />}>
                        {t('Click to Upload')}
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {t('Report')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Report
