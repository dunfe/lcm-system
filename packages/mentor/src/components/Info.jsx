import * as React from "react";
import {DatePicker, Form, Input, InputNumber, Radio} from "antd";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};

const Info = () => {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <Form style={{paddingTop: 24}} {...layout} name="nest-messages" onFinish={onFinish}>
            <Form.Item name={['user', 'username']} label="Tên đăng nhập" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'password']} label="Mật khẩu" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name={['user', 'confirm']} label="Mật khẩu"
                       dependencies={['user', 'password']}
                       hasFeedback
                       rules={[
                           {
                               required: true,
                               message: 'Vui lòng xác nhận mật khẩu!',
                           },
                           ({ getFieldValue }) => ({
                               validator(_, value) {
                                   if (!value || getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }
                                   return Promise.reject(new Error('Hai mật khẩu phải giống nhau!'));
                               },
                           }),
                       ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name={['user', 'fullname']} label="Họ và tên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Số điện thoại" rules={[{ required: true }]}>
                <InputNumber style={{width: "30%"}} keyboard={false}/>
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Ngày sinh" rules={[{ type: 'date' }]}>
                <DatePicker placeholder={'Chọn ngày'}/>
            </Form.Item>
            <Form.Item name={['user', 'gender']} label="Giới tính">
                <Radio.Group name="radiogroup" defaultValue={'male'}>
                    <Radio value={'male'}>Nam</Radio>
                    <Radio value={'female'}>Nữ</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default Info;
