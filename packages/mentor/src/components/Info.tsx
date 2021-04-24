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
            <Form.Item name={'password'} label="Mật khẩu" hasFeedback rules={usePasswordRule()}>
                <Input.Password/>
            </Form.Item>
            <Form.Item name={'confirm'} label={trans('Re password')}
                       dependencies={['user', 'password']}
                       hasFeedback
                       rules={[
                           {
                               required: true,
                               message: 'Vui lòng xác nhận mật khẩu!',
                           },
                           ({getFieldValue}) => ({
                               validator(_, value) {
                                   if (!value || getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }
                                   return Promise.reject(new Error('Hai mật khẩu phải giống nhau!'));
                               },
                           }),
                       ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item name={'fullname'} label="Họ và tên" hasFeedback rules={[{required: true, message: 'Vui lòng nhập đầy đủ họ và tên!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'email'} label="Email" hasFeedback rules={[{type: 'email', required: true, message: 'Vui lòng nhập email!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'phone'} label="Số điện thoại">
                <InputNumber style={{width: "30%"}} keyboard={false}/>
            </Form.Item>
            <Form.Item name={'age'} label="Ngày sinh" rules={[{type: 'date'}]}>
                <DatePicker placeholder={'Chọn ngày'}/>
            </Form.Item>
            <Form.Item name={'gender'} label="Giới tính">
                <Radio.Group name="radiogroup">
                    <Radio value={'male'}>Nam</Radio>
                    <Radio value={'female'}>Nữ</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default Info;
