import * as React from 'react';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { Facebook } from '../../components/Logo/Facebook';
import { Goolge } from '../../components/Logo/Google';
import { Github } from '../../components/Logo/Github';
import { useAuth } from '../../utils/hooks/useAuth';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

const QuickLogin = () => {
    const auth = useAuth();
    const history = useHistory();

    const handleGoogleClick = () => {
        auth
        .signInWithGoogle()
        .then(response => {
  
          if (response) {
            message.success('Đăng nhập thành công!').then(() => {
              console.log(response);
            });
  
            history.push("/");
          }
        })
        .catch(error => {
          message.error('Đăng nhập không thành công!').then(() => {
            console.error(error);
          });
        });
    }
    return (
        <QuickLoginContainer>
            <span>Đăng nhập nhanh: </span>
            <Icon component={Facebook} />
            <Icon component={Goolge} onClick={handleGoogleClick}/>
            <Icon component={Github} />
        </QuickLoginContainer>
    )
};

const QuickLoginContainer = styled.div`
    width: 360px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    padding-bottom: 20px;

    span {
        padding-right: 10px;
    }
`

export default QuickLogin;