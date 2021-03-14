import { Button, Checkbox, Form, Input, message } from 'antd';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SignUpComponent = () => {
  const history = useHistory();
  const auth = useAuth();

  const onFinish = (values: any) => {
    const { username, email, password, display_name } = values;

    auth
      .signUp(username, email, password, display_name)
      .then(response => {
        message.success('Đăng ký thành công').then(() => {
          console.log(response);
        });
        history.push("/");
      })
      .catch(error => {
        message.error('Đăng ký không thành công: ' + error).then(() => {
          console.error(error);
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item wrapperCol={{ span: 24 }} name="display_name">
        <Input
          width={'100%'}
          placeholder="Họ và tên"
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }} name="username">
        <Input
          width={'100%'}
          placeholder="Tên người dùng"
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
        name="email"
        rules={[{
          type: 'email',
          message: 'Email không hợp lệ',
        }, { required: true, message: 'Vui lòng điền email!' }]}
      >
        <Input
          placeholder="Email"
          prefix={
            <MailOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
        name="password"
        rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}
        hasFeedback
      >
        <Input.Password
          placeholder="Mật khẩu"
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
        name="confirm"
        dependencies={['password']}
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
              return Promise.reject('Hai mật khẩu cần giống nhau!');
            },
          }),
        ]}
      >
        <Input.Password
          width={'100%'}
          placeholder="Nhập lại mật khẩu"
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject('Should accept agreement'),
          },
        ]}
      >
        <Checkbox>
          Tôi đã đọc và đồng ý với{' '}
          <a href="">điều khoản & chính sách sử dụng</a>
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <StyledButton type="primary" htmlType="submit">
          Đăng ký
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

const StyledButton = styled(Button)`
  width: 100%;
`;

export default SignUpComponent;
