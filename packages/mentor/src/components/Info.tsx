import * as React from "react";
import {DatePicker, Form, FormInstance, Input, InputNumber, Radio} from "antd";
import { usePasswordRule } from '../../../common/index'
import { useTrans } from 'common'

interface IProps {
    form: FormInstance<any>;
}
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
};

const Info = (props: IProps) => {
    const {form} = props;
    const trans = useTrans()

    return (
        <Form form={form} style={{paddingTop: 24}} {...layout} name="info">
            <Form.Item name={'username'} label={trans('Username')} hasFeedback rules={[{required: true, message: 'Vui lòng nhập tên đăng nhập!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'password'} label={trans('Password')} hasFeedback rules={usePasswordRule()}>
                <Input.Password/>
            </Form.Item>
            <Form.Item name={'confirm'} label={trans('Re password')}
                       dependencies={['user', 'password']}
                       hasFeedback
                       rules={[
                           {
                               required: true,
                               message: trans('Please re enter your password'),
                           },
                           ({getFieldValue}) => ({
                               validator(_, value) {
                                   if (!value || getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }
                                   return Promise.reject(new Error(trans('Password need to match')));
                               },
                           }),
                       ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item name={'fullname'} label="Họ và tên" hasFeedback rules={[{required: true, message: trans('Please enter your full name')}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'email'} label="Email" hasFeedback                 rules={[
                {
                    type: 'email',
                    message: trans('Invalid email'),
                },
                { required: true, message: trans('Please enter your email') },
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'phone'} label={trans('Phone Number')}>
                <InputNumber style={{width: "30%"}} keyboard={false}/>
            </Form.Item>
            <Form.Item name={'age'} label={trans('Date of birth')} rules={[{type: 'date'}]}>
                <DatePicker placeholder={trans('Choose the day')}/>
            </Form.Item>
            <Form.Item name={'gender'} label={trans('Gender')} initialValue={'male'}>
                <Radio.Group name="radiogroup">
                    <Radio value={'male'}>{trans('Male')}</Radio>
                    <Radio value={'female'}>{trans('Female')}</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default Info;
