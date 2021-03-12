import { Button, Checkbox, Form, Input, message } from 'antd';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SignInComponent = () => {
  const history = useHistory();
  const auth = useAuth();

  const onFinish = (values: any) => {
    const { email, password } = values;

    auth
      .signIn(email, password)
      .then(response => {
        message.success('Đăng nhập thành công!').then(() => {
          console.log(response);
        });

        history.push("/");
      })
      .catch(error => {
        message.error('Đăng nhập không thành công!').then(() => {
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
      <Form.Item
        wrapperCol={{ span: 24 }}
        name="email"
        rules={[{ required: true, message: 'Vui lòng điền tên tài khoản!' }]}
      >
        <Input
          placeholder="Tên tài khoản"
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
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          width={'100%'}
          placeholder="Mật khẩu"
          prefix={
            <LockOutlined
              className="site-form-item-icon"
              style={{ color: '#ff8e3c' }}
            />
          }
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <StyledButton type="primary" htmlType="submit">
          Đăng nhập
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

const StyledButton = styled(Button)`
  width: 100%;
`;

export default SignInComponent;
