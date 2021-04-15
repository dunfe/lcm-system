import * as React from 'react'
import { Form, Input, Select, Button, message, InputNumber, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { useForm } from 'antd/es/form/Form'

interface IProps {
    mode: string
    setMode?: (state: string) => void
    selectedId?: string
    setSelectedKeys?: (state: string[]) => void
}

interface IQuestion {
    receivedBy: string[]
    point: number
    skill: string[]
    timeAvailableFrom: number
    timeAvailableTo: number
    status: string
    _id: string
    title: string
    menteeId: string
    menteeName: string
    content: string
    createAt: string
    __v: number
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

const { useState, useEffect } = React
const { success } = Modal

const AddQuestion = (props: IProps) => {
    const history = useHistory()
    const { t } = useTranslation()
    const instance = useAPI()
    const [form] = useForm()

    const { setSelectedKeys, selectedId, mode, setMode } = props

    const [skills, setSkills] = useState([])
    const [question, setQuestion] = useState<IQuestion>()

    const onFinish = (values: any) => {
        if (mode === 'add') {
            instance
                .post('/api/users/questions', values)
                .then((response) => {
                    if (response.status === 200) {
                        success({
                            content: t('Add successfully'),
                            afterClose: () => {
                                history.push('/questions')
                                if (setSelectedKeys) {
                                    setSelectedKeys(['/questions'])
                                }
                            },
                        })
                    }
                })
                .catch((error) => console.error(error))
        } else {
            instance
                .put('/api/users/questions', values)
                .then((response) => {
                    if (response.status === 200) {
                        success({
                            content: t('Update successfully'),
                            afterClose: () => {
                                if (setMode) {
                                    setMode('detail')
                                }
                            },
                        })
                    }
                })
                .catch((error) => console.error(error))
        }
    }

    useEffect(() => {
        if (selectedId && question && mode === 'update') {
            form.setFieldsValue(question)
        }
    }, [question])

    useEffect(() => {
        if (selectedId) {
            instance
                .get(`/api/users/questions/${selectedId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setQuestion(response.data.data)
                    }
                })
        }
    }, [selectedId])

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
        <Form {...layout} name="question" onFinish={onFinish} form={form}>
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
                    {mode === 'add' ? t('Create') : t('Save')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddQuestion
