import * as React from 'react'
import { Row, Col, Form, Input, Button, Upload, message, Radio } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useAuth } from '../../utils/hooks/useAuth'
import { useState } from 'react'
import { useAPI } from '../../utils/hooks/useAPI'
import { useToken } from '../../utils/hooks/useToken'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
}

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }

    return isJpgOrPng && isLt2M
}

const InfoSetting = () => {
    const auth = useAuth()
    const instance = useAPI()
    const token = useToken()

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImgURL] = useState('')

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const props = {
        name: 'avatar',
        action: 'https://livecoding.me/api/users/upload-file',
        headers: {
            Authorization: token!,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setLoading(true)
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                    setImgURL(imageUrl)
                    setLoading(false)
                })
            } else if (info.file.status === 'error') {
                setLoading(false)
            }
        },
    }

    const onFinish = (values) => {
        instance
            .put('/api/users', values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Cập nhật thành công!')
                    setImgURL('')
                }
            })
            .catch((error) => console.error(error))
    }

    return (
        <Row gutter={24}>
            <Col span={16}>
                <Form {...layout} name="infosetting" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={auth.user?.user.data.email}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        initialValue={auth.user?.user.data.detail.phone}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        initialValue={
                            auth.user?.user.data.detail.gender !== ''
                                ? auth.user?.user.data.detail.gender.toLowerCase()
                                : 'male'
                        }
                    >
                        <Radio.Group>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        initialValue={auth.user?.user.data.detail.address}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Công việc hiện tại"
                        name="currentJob"
                        initialValue={auth.user?.user.data.detail.currentJob}
                    >
                        <Input />
                    </Form.Item>

                    {auth.user?.user.data.role === 'mentor' ? (
                        <>
                            <Form.Item
                                label="Thành tựu"
                                name="achievement"
                                initialValue={
                                    auth.user?.user.data.detail.currentJob
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kỹ năng"
                                name="skill"
                                initialValue={
                                    auth.user?.user.data.detail.currentJob
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Bio"
                                name="bio"
                                initialValue={
                                    auth.user?.user.data.detail.currentJob
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Github"
                                name="github"
                                initialValue={
                                    auth.user?.user.data.detail.currentJob
                                }
                            >
                                <Input />
                            </Form.Item>
                        </>
                    ) : null}

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}>
                <h3>Ảnh đại diện</h3>
                <div style={{ paddingTop: 12 }}>
                    <Upload
                        {...props}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: '100%' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>
            </Col>
        </Row>
    )
}

export default InfoSetting
