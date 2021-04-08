import {Avatar, Badge, Menu} from 'antd';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../utils/hooks/useAuth';
import {BellOutlined, UserOutlined} from '@ant-design/icons';
import "./Header.css";
import axios from "axios";

interface INotify {
    read: boolean,
    _id: string,
    title: string,
    receivedById: string,
    content: string,
    createdAt: string,
    __v: number
}

const {SubMenu} = Menu;

const instance = axios.create({baseURL: 'https://livecoding.me'});
const {useState, useEffect} = React;

const HeaderComponent = () => {
    const history = useHistory();
    const auth = useAuth();
    const [notify, setNotify] = useState<INotify[]>([]);
    const [count, setCount] = useState(0);

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
    };

    useEffect(() => {
        const role = auth.user?.user.data.role;
        instance.get(`/api/${role}/notify`, {
            headers: {
                'Authorization': auth.user?.user.token
            }
        }).then((response) => {
            if (response.status === 200) {
                setNotify(response.data.data.results);
                const _count = response.data.readFalse;
                setCount(_count);
            }
        }).catch((error) => console.error(error));
    }, []);

    const _notify = notify.map((item) => (
        <Menu.Item key={item._id}>
            {item.title}
        </Menu.Item>
    ));

    const MenuIcon = (
        <Badge count={count} showZero={true}>
            <BellOutlined style={{fontSize: 20, paddingLeft: 10}}/>
        </Badge>
    );

    return (
            <Menu mode="horizontal" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <SubMenu key="notify" icon={MenuIcon} style={{paddingTop: 5}}>
                    <Menu.ItemGroup title="Thông báo của bạn">
                        {_notify}
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="profile" icon={<Avatar src={auth.user?.user.data.detail.avatar} icon={<UserOutlined/>}/>}>
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
                </SubMenu>
            </Menu>
    );
};

export default HeaderComponent;
