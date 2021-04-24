import * as React from 'react'
import {
    Button,
    Form,
    FormInstance,
    Input,
    message,
    Select,
    Upload,
} from 'antd'
import { useTrans } from 'common'
import { useDispatch, useSelector } from 'react-redux'
import { get, selectAllSkills } from '../../features/skill/skillsSlice'
import { useSkills } from '../../utils/hooks/useSkills'
import { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { useToken } from '../../utils/hooks/useToken'

interface IProps {
    form: FormInstance
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
}

const Skills = (props: IProps) => {
    const { form } = props
    const _skills = useSelector(selectAllSkills)
    const skills = useSkills(_skills)
    const trans = useTrans()
    const token = useToken()
    const dispatch = useDispatch()
    const [CVUrl, setCVUrl] = useState('')

    const handleChange = (selected: string[]) => {
        console.log(selected)
    }

    const beforeUpload = (file) => {
        const isPDF = file.type === 'application/pdf'
        if (!isPDF) {
            message.error(trans('You can only upload PDF file!'))
        }
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
            message.error(trans('Image must smaller than 1MB!'))
        }

        return isPDF && isLt2M
    }

    const upload = {
        name: 'cv',
        action: 'https://livecoding.me/api/users/mentor/register/upload-file',
        headers: {
            Authorization: token!,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
                setCVUrl(info.file.response.url)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    useEffect(() => {
        if (skills.length === 0) {
            dispatch(get())
        }
    }, [])

    return (
        <Form
            form={form}
            style={{ paddingTop: 24 }}
            {...layout}
            name="nest-messages"
        >
            <Form.Item
                name={'skills'}
                label={trans('Choose your skills')}
                rules={[
                    {
                        required: true,
                        message: trans('Please choose your skills'),
                    },
                ]}
            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    options={skills}
                    placeholder={trans('Choose your skills')}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item name={'cv'} noStyle hidden>
                <Input value={CVUrl} />
            </Form.Item>
            <Form.Item
                label={trans('Your resume')}
                rules={[
                    {
                        required: true,
                        message: trans('Please upload your CV'),
                    },
                ]}
            >
                <Upload {...upload} beforeUpload={beforeUpload} maxCount={1}>
                    <Button icon={<UploadOutlined />}>
                        {trans('Click to Upload')}
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item label={trans('Current Job')} name={'currentJob'}>
                <Input />
            </Form.Item>
            <Form.Item label={trans('Achievement')} name={'achievement'}>
                <Input />
            </Form.Item>
            <Form.Item
                label={trans('Bio')}
                name={'bio'}
                rules={[
                    {
                        max: 100,
                        message: trans('Must lower then 100 character'),
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label={trans('Github')}
                name={'github'}
                rules={[
                    {
                        pattern: new RegExp(
                            'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
                        ),
                        message: trans('Please enter a valid link'),
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default Skills
