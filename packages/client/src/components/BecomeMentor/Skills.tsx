import * as React from 'react'
import { Form, FormInstance, Input, Select } from 'antd'
import { useTrans } from 'common'
import { useSelector } from 'react-redux'
import { selectAllSkills } from '../../features/skill/skillsSlice'
import { useSkills } from '../../utils/hooks/useSkills'

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

    const handleChange = (selected: string[]) => {
        console.log(selected)
    }

    return (
        <Form
            form={form}
            style={{ paddingTop: 24 }}
            {...layout}
            name="nest-messages"
        >
            <Form.Item
                name={['user', 'skills']}
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
            <Form.Item
                name={['user', 'cv']}
                label={trans('Link your CV')}
                rules={[
                    {
                        required: true,
                        message: trans('Please input the link to your CV'),
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'github']} label={trans('Link Github')}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'linkedin']} label="Linkedin">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default Skills
