import * as React from 'react'
import { Form, Input, Select, Button, message, InputNumber, Modal } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface IProps {
    setSelectedKeys: (state: string[]) => void
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

const { useState, useEffect } = React
const { success } = Modal

const AddQuestion = (props: IProps) => {
    const auth = useAuth()
    const history = useHistory()
    const { t } = useTranslation()

    const { setSelectedKeys } = props

    const [skills, setSkills] = useState([])

    const instance = axios.create({ baseURL: 'https://livecoding.me' })

    const onFinish = (values: any) => {
        const config = {
            headers: {
                Authorization: auth.user?.user.token,
                'Content-Type': 'application/json',
            },
            data: values,
        }
        instance
            .post('/api/users/questions', JSON.stringify(values), config)
            .then((response) => {
                if (response.status === 200) {
                    success({
                        content: t('Add successfully'),
                        afterClose: () => {
                            history.push('/questions')
                            setSelectedKeys(['/questions'])
                        },
                    })
                }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
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
                .catch((error) => message.error(error.message))
        }
        getSkills()

        return () => setSkills([])
    }, [])

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
            <Form.Item
                name={'title'}
                label={t('Title')}
                rules={[{ required: true }]}
            >
                <Input placeholder={t('Title')} />
            </Form.Item>
            <Form.Item
                name={'content'}
                label={t('Content')}
                rules={[{ required: true }]}
            >
                <Input.TextArea placeholder={t('Content')} />
            </Form.Item>
            <Form.Item
                name={'skill'}
                label={t('Skill')}
                rules={[
                    { required: true, message: t('Please select the skill') },
                ]}
            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    options={skills}
                    placeholder={t('Skill')}
                />
            </Form.Item>
            <Form.Item name={'point'} label={t('Point')} initialValue={0}>
                <InputNumber
                    placeholder={t('Point')}
                    style={{ width: '20%' }}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    {t('Create')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddQuestion
