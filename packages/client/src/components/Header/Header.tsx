import {Avatar, Badge, Dropdown, Layout, Menu} from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../utils/hooks/useAuth';
import {UserOutlined, BellOutlined} from '@ant-design/icons';
import {LogoContainer} from "../Logo/LogoContainer";
import {Logo} from "../Logo/Logo";
import "./Header.css";
import Notify from "../Notify/Notify";

const {Header} = Layout;

const HeaderComponent = () => {
    const history = useHistory();
    const auth = useAuth();

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
    };

    const menu = (
        <Menu>
            <Menu.Item>
                {auth.user?.user.data.fullname}
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
        <StyledHeader>
            <LogoContainer className="logo">
                <Logo/>
            </LogoContainer>
            <div className={"header-right"}>
                <div className={'header-notify'}>
                    <Notify/>
                </div>
                <div>
                    <Dropdown overlay={menu}>
                        <div style={{width: 50}}>
                            <Avatar src={auth.user?.user.data.detail.avatar} icon={<UserOutlined/>}/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default HeaderComponent;
