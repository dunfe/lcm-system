import * as React from 'react';
import { reducer } from '../../../redux/slice/authenticationSlice';
import authenticationSaga from '../../../sagas/authentication/authenticationSaga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Tabs } from 'antd';
import styled from 'styled-components';
import SignInComponent from '../../components/Auth/SignInComponent';
import SignUpComponent from '../../components/Auth/SignUpComponent';

const { TabPane } = Tabs;

const LoginPage = () => {
  useInjectReducer({ key: 'authentication', reducer });
  useInjectSaga({
    key: 'authentication',
    saga: authenticationSaga,
  });

  return (
    <LoginPageContainer className={'login-page-container'}>
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

export default LoginPage;
