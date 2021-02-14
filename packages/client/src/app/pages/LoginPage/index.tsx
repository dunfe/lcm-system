import * as React from 'react';
import { actions, reducer } from '../../../redux/slice/authenticationSlice';
import authenticationSaga from '../../../sagas/authentication/authenticationSaga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../types/RootState';

const LoginPage = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'authentication', reducer });
  useInjectSaga({ key: 'authentication', saga: authenticationSaga });

  const onLogin = () => {
    dispatch(actions.signIn);
  };

  const onLogout = () => {
    dispatch(actions.signOut);
  };

  const isAuthenticated = useTypedSelector(state => state.isAuthenticated);

  return (
    <div className={'login-page-container'}>
      <p>{isAuthenticated}</p>
      <div className={'login-form'}>
        <Button onClick={onLogin}>Login</Button>
        <Button onClick={onLogout}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
