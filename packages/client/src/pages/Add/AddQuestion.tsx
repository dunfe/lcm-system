import * as React from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    Modal,
    Skeleton,
    TimePicker,
} from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionsStatus } from '../Question/questionSlice'
import {
    get,
    selectAllSkills,
    selectSkillsStatus,
} from '../../features/skill/skillsSlice'

interface IProps {
    mode: string
    setMode?: (state: string) => void
    selectedId?: string
    setSelectedKeys?: (state: string[]) => void
    reloadQuestion?: (state: IQuestion) => void
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
    const dispatch = useDispatch()

    const { setSelectedKeys, selectedId, mode, setMode, reloadQuestion } = props

    const questionsStatus = useSelector(selectQuestionsStatus)
    const _skills = useSelector(selectAllSkills)
    const skillsStatus = useSelector(selectSkillsStatus)

    const [skills, setSkills] = useState<{ label: string; value: string }[]>([])
    const [question, setQuestion] = useState<IQuestion>()
    const [loading, setLoading] = useState(true)
    const [addLoading, setAddLoading] = React.useState(false)

    const onFinish = (values: any) => {
        setAddLoading(true)
        const start = dayjs(values.time[0] || null).valueOf()
        const end = dayjs(values.time[1] || null).valueOf()

        const _values = {
            ...values,
            timeAvailableFrom: start,
            timeAvailableTo: end,
        }

        if (mode === 'add') {
            instance
                .post('/api/users/questions', _values)
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
                .finally(() => setAddLoading(false))
                .catch((error) => console.error(error))
        } else {
            instance
                .put(`/api/users/questions/${selectedId}`, _values)
                .then((response) => {
                    if (response.status === 200) {
                        success({
                            content: t('Update successfully'),
                            afterClose: () => {
                                if (setMode && reloadQuestion) {
                                    setMode('detail')
                                    reloadQuestion(response.data.data)
                                }
                            },
                        })
                    }
                })
                .finally(() => setAddLoading(false))
                .catch((error) => console.error(error))
        }
    }

    useEffect(() => {
        if (Array.isArray(_skills) && _skills.length > 0) {
            const data = _skills.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                }
            })
            setSkills(data)
        }
    }, [_skills])

    useEffect(() => {
        if (skillsStatus === 'loading') {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [skillsStatus])

    useEffect(() => {
        if (questionsStatus === 'loading') {
            setAddLoading(true)
        } else {
            setAddLoading(false)
        }
    }, [questionsStatus])

    useEffect(() => {
        if (selectedId && question && mode === 'update') {
            form.setFieldsValue(question)
        }
    }, [question])

    useEffect(() => {
        setLoading(true)
        if (selectedId) {
            instance
                .get(`/api/users/questions/${selectedId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setQuestion(response.data.data)
                    }
                })
                .finally(() => setLoading(false))
                .catch((error) => console.error(error))
        }
    }, [selectedId])

    useEffect(() => {
        dispatch(get())
    }, [])

    return (
        <>
            {loading ? (
                <Skeleton active={true} />
            ) : (
                <Form
                    {...layout}
                    name="question"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name={'title'}
                        label={t('Title')}
                        rules={[
                            {
                                required: true,
                                max: 50,
                                message: t(
                                    'Title is require and title must less than 50 character'
                                ),
                            },
                        ]}
                    >
                        <Input placeholder={t('Title')} />
                    </Form.Item>
                    <Form.Item
                        name={'content'}
                        label={t('Content')}
                        rules={[
                            {
                                required: true,
                                message: t('You must enter something'),
                            },
                        ]}
                    >
                        <Input.TextArea placeholder={t('Content')} />
                    </Form.Item>
                    <Form.Item
                        name={'skill'}
                        label={t('Skill')}
                        rules={[
                            {
                                required: true,
                                message: t('Please select the skill'),
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            options={skills}
                            placeholder={t('Skill')}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'time'}
                        label={t(t('Time Available'))}
                        initialValue={[
                            dayjs().startOf('day'),
                            dayjs().endOf('day'),
                        ]}
                    >
                        <TimePicker.RangePicker
                            format={'HH:mm'}
                            style={{ width: '20%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'point'}
                        label={t('Point')}
                        initialValue={0}
                        rules={[
                            {
                                required: true,
                                message: t('Please set at least 10 point'),
                            },
                            {
                                type: 'number',
                                min: 10,
                                max: 1000,
                                message: t('Point must be between 10 and 1000'),
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder={t('Point')}
                            style={{ width: '10%' }}
                        />
                    </Form.Item>
                    <Form.Item name={'note'} label={t('Note')}>
                        <Input placeholder={t('Note')} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={addLoading}
                        >
                            {mode === 'add' ? t('Create') : t('Save')}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    )
}

export default AddQuestion
