import * as React from 'react'
import { Form, FormInstance, Input, message, Select } from 'antd'
import axios from 'axios'
import { useTrans } from 'common'

interface IProps {
    form: FormInstance<any>;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
}

const { useState, useEffect } = React
const instance = axios.create({ baseURL: 'https://livecoding.me' })

const Skills = (props: IProps) => {
    const { form } = props
    const [skills, setSkills] = useState([])
    const trans = useTrans()

    const handleChange = (selected: string[]) => {
        console.log(selected)
    }

    useEffect(() => {
        instance.get('/api/users/skills').then((response) => {
            if (response.status === 200) {
                const options = response.data.skill.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id,
                    }
                })
                if (options) {
                    setSkills(options)
                }
            }
        }).catch((error) => message.error(error.message))
    })
    return (
        <Form form={form} style={{ paddingTop: 24 }} {...layout} name='nest-messages'>
            <Form.Item name={['user', 'skills']} label={trans('Choose your skills')}
                       rules={[{ required: true, message: trans('Please choose your skills') }]}>
                <Select mode='tags' style={{ width: '100%' }}
                        options={skills}
                        placeholder={trans('Choose your skills')} onChange={handleChange} />
            </Form.Item>
            <Form.Item name={['user', 'cv']} label={trans('Link your CV')}
                       rules={[{ required: true, message: trans('Please input the link to your CV') }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'github']} label={trans('Link Github')}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'linkedin']} label='Linkedin'>
                <Input />
            </Form.Item>
        </Form>
    )
}

export default Skills
