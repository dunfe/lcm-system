import { Avatar, Menu } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { useAvatar } from '../../utils/hooks/useAvatar'
import { SelectLocale, useTrans } from 'common'
import { useFullname} from '../../utils/hooks/useFullname'

const {SubMenu } = Menu
const HeaderComponent = () => {
  const history = useHistory();
  const auth = useAuth();
  const avatar = useAvatar();
  const trans = useTrans();
  const fullname = useFullname()

  const onSignOut = () => {
    auth.signOut().then(() => {
      history.push('/');
    });
  };


  return (
    <StyledHeader mode={'horizontal'}>
        <SubMenu
            key="profile"
            icon={<Avatar src={avatar} icon={<UserOutlined />} />}
        >
            <StyledMenuItem disabled>
                {fullname}
            </StyledMenuItem>
            <StyledMenuItem danger>
                <a onClick={onSignOut}>{trans('Logout')}</a>
            </StyledMenuItem>
        </SubMenu>
        <SelectLocale />
    </StyledHeader>
  );
};

const StyledHeader = styled(Menu)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: white;
    align-items: center;
  padding-right: 12px;
`

const StyledMenuItem = styled(Menu.Item)`
    max-width: 300px;
`

export default HeaderComponent;
