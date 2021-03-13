import * as React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import SignInComponent from '../../components/Auth/SignInComponent';

const { TabPane } = Tabs;

const LoginPage = () => {
  return (
    <LoginPageContainer className={'login-page-container'}>
      <StyledTabs defaultActiveKey="1">
        <TabPane tab="Đăng nhập" key="1">
          <SignInComponent />
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

export default LoginPage;
