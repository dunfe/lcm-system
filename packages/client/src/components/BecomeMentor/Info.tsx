import { useFullname } from '../../utils/hooks/useFullname'
import { useUsername } from '../../utils/hooks/useUsername'
import { useEmail } from '../../utils/hooks/useEmail'
import { usePhoneNumber } from '../../utils/hooks/usePhoneNumber'
import DatePicker from '../Custom/DatePicker'
import { useDOB } from '../../utils/hooks/useDOB'
import dayjs from 'dayjs'
import { useTrans } from 'common'
import { useFullnameRule, usePhoneNumberRule } from 'common'
import { Form, FormInstance, Input, Radio, Select } from 'antd'
import * as React from 'react'

interface IProps {
    form: FormInstance
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
}

const { Option } = Select

const Info = (props: IProps) => {
    const { form } = props
    const trans = useTrans()
    const fullname = useFullname()
    const username = useUsername()
    const email = useEmail()
    const phone = usePhoneNumber()
    const dob = useDOB()

    const prefixSelector = (
        <Form.Item name="prefix" noStyle initialValue={'+84'}>
            <Select style={{ width: 70 }}>
                <Option value="+84">+84</Option>
            </Select>
        </Form.Item>
    )

    return (
        <Form form={form} style={{ paddingTop: 24 }} {...layout} name="info">
            <Form.Item
                label={trans('Username')}
                name={'username'}
                initialValue={username}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name={'email'} initialValue={email}>
                <Input disabled />
            </Form.Item>
            <Form.Item
                name={'fullname'}
                label="Họ và tên"
                hasFeedback
                initialValue={fullname}
                rules={useFullnameRule()}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'phone'}
                label={trans('Phone Number')}
                initialValue={phone}
                rules={[
                    ...usePhoneNumberRule(),
                    {
                        required: true,
                        message: trans('Please input your phone number'),
                    },
                ]}
            >
                <Input style={{ width: '50%' }} addonBefore={prefixSelector} />
            </Form.Item>
            <Form.Item
                name={'age'}
                label={trans('Date of birth')}
                initialValue={dob ? dayjs(dob) : null}
                rules={[
                    { type: 'date' },
                    {
                        required: true,
                        message: trans('Please input your date of birth'),
                    },
                ]}
            >
                <DatePicker placeholder={trans('Choose the day')} />
            </Form.Item>
            <Form.Item
                name={'gender'}
                label={trans('Gender')}
                initialValue={'male'}
            >
                <Radio.Group name="radiogroup">
                    <Radio value={'male'}>{trans('Male')}</Radio>
                    <Radio value={'female'}>{trans('Female')}</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default Info
