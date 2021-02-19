import { Avatar, Dropdown, Layout, Menu } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../utils/hooks/useAuth';
import { actions } from '../../../redux/slice/authenticationSlice';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useAuth();

  const onSignOut = () => {
    auth.signOut().then(() => {
      dispatch(actions.signOut);
      history.push('/');
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        {auth.user?.displayName ? auth.user?.displayName : auth.user?.email}
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>
        <a onClick={onSignOut}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader className="site-layout-sub-header-background">
      <Dropdown overlay={menu}>
        <div style={{ width: 50 }}>
          <Avatar src={auth.user?.photoURL} icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export default HeaderComponent;
