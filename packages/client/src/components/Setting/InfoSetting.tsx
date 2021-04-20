import * as React from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Upload,
    message,
    Radio,
    Select,
    InputNumber,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useAPI } from '../../utils/hooks/useAPI'
import { useToken } from '../../utils/hooks/useToken'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../utils/hooks/useUserInfo'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import DatePicker from '../Custom/DatePicker'

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

const { useState, useEffect } = React

const InfoSetting = () => {
    const instance = useAPI()
    const token = useToken()
    const { t } = useTranslation()
    const [form] = useForm()
    const user = useUserInfo()

    const [loading, setLoading] = useState(false)
    const [imgURL, setImgURL] = useState('')
    const [skills, setSkills] = useState()

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{t('Upload')}</div>
        </div>
    )

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
                getBase64(info.file.originFileObj, () => {
                    setImgURL(info.file.response.url)
                    setLoading(false)
                })
            } else if (info.file.status === 'error') {
                setLoading(false)
            }
        },
    }

    const onFinish = (values) => {
        const _values = { ...values, avatar: imgURL }
        delete _values.email
        instance
            .put('/api/users', _values)
            .then((response) => {
                if (response.status === 200) {
                    message.success(t('Updated'))
                    setImgURL('')
                }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        if (!user) {
            return
        }

        if (user.role.toLowerCase() === 'mentee') {
            form.setFieldsValue({
                fullname: user?.fullname,
                email: user.email,
                phone: user.detail?.phone,
                gender: user.detail?.gender?.toLowerCase() || 'male',
                address: user.detail?.address,
                currentJob: user.detail?.currentJob,
                achievement: user.detail?.achievement,
                dob: dayjs(user.detail?.dob),
            })
        } else {
            form.setFieldsValue({
                fullname: user.fullname,
                email: user.email,
                phone: user.detail.phone,
                gender: user.detail.gender?.toLowerCase() || 'male',
                address: user.detail.address,
                currentJob: user.detail.currentJob,
                skill: user.skill,
                bio: user.bio,
                github: user.github,
            })
        }
    }, [user])

    useEffect(() => {
        setLoading(true)
        const getSkills = () => {
            instance
                .get('/api/admin/skills', {
                    method: 'get',
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwNTBhOGU4YTAxYzljMjdmMDNhZDk4NiIsInVzZXJuYW1lIjoiYWRtaW4xIn0sImlhdCI6MTYxNTg5OTc2MX0.GqyRhTl1HqKCsKrvEcX0PYI97AHKqep5021xmdJP_14',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const options = response.data.skill.map((item: any) => {
                            return {
                                label: item.name,
                                value: item.name,
                            }
                        })
                        if (options) {
                            setSkills(options)
                        }
                    }
                })
                .finally(() => setLoading(false))
                .catch((error) => message.error(error.message))
        }
        getSkills()
    }, [])

    return (
        <Row gutter={24}>
            <Col span={16}>
                <Form
                    {...layout}
                    name="infoSetting"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item label={t('Full name')} name="fullname">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('Email')} name="email">
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label={t('Phone Number')}
                        name="phone"
                        rules={[
                            {
                                pattern: new RegExp(
                                    '(9|1[2|6|8|9])+([0-9]{8})\\b'
                                ),
                                message: t('Please enter a valid phone number'),
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: '50%' }}
                            formatter={(value) => `0${value}`}
                        />
                    </Form.Item>
                    <Form.Item label={t('Gender')} name="gender">
                        <Radio.Group>
                            <Radio value="male">{t('Male')}</Radio>
                            <Radio value="female">{t('Female')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={t('Date of birth')} name="dob">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label={t('Address')} name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('Current Job')} name="currentJob">
                        <Input />
                    </Form.Item>
                    <Form.Item label={t('Achievement')} name="achievement">
                        <Input />
                    </Form.Item>

                    {user?.role === 'mentor' ? (
                        <>
                            <Form.Item name={'skill'} label={t('Skill')}>
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    options={skills}
                                    placeholder={t('Skill')}
                                />
                            </Form.Item>
                            <Form.Item label={t('Bio')} name="bio">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={t('Github')}
                                name="github"
                                rules={[
                                    {
                                        pattern: new RegExp(
                                            'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
                                        ),
                                        message: t('Please enter a valid link'),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    ) : null}

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {t('Update')}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}>
                <h3>{t('Avatar')}</h3>
                <div style={{ paddingTop: 12 }}>
                    <Upload
                        {...props}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        {imgURL ? (
                            <img
                                src={imgURL}
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
