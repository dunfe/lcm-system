import * as React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import SignInComponent from '../../components/Auth/SignInComponent';
import SignUpComponent from '../../components/Auth/SignUpComponent';
import QuickLogin from '../../components/Auth/QuickLogin';
import { Logo } from '../../components/Logo/Logo';

const { TabPane } = Tabs;

const LoginPage = () => {
  return (
    <LoginPageContainer className={'login-page-container'}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <QuickLogin />
      <StyledTabs defaultActiveKey="1">
        <TabPane tab="Đăng nhập" key="1">
          <SignInComponent />
        </TabPane>
        <TabPane tab="Đăng ký" key="2">
          <SignUpComponent />
        </TabPane>
      </StyledTabs>
    </LoginPageContainer>
  );
};

const StyledTabs = styled(Tabs)`
  width: 360px;
`;

const LoginPageContainer = styled.div`
  display: grid;
  place-items: center;
`;

const LogoContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`

export default LoginPage;
