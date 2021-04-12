import {Avatar, Badge, Menu} from 'antd';
import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../../utils/hooks/useAuth';
import {BellOutlined, UserOutlined} from '@ant-design/icons';
import "./Header.css";
import {useFullname} from "../../utils/hooks/useFullname";
import {useAvatar} from "../../utils/hooks/useAvatar";
import {useAPI} from "../../utils/hooks/useAPI";

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

const {useState, useEffect} = React;

const HeaderComponent = () => {
    const history = useHistory();
    const auth = useAuth();
    const userFullname = useFullname();
    const avatar = useAvatar();
    const instance = useAPI();

    const [notify, setNotify] = useState<INotify[]>([]);
    const [count, setCount] = useState(0);

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push('/');
        });
    };

    useEffect(() => {
        instance.get(`/api/users/notify`,)
            .then((response) => {
                if (response.status === 200) {
                    setNotify(response.data.data.results);
                    const _count = response.data.readFalse;
                    setCount(_count);
                }
            })
            .catch((error) => console.error(error));
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
            <SubMenu key="profile" icon={<Avatar src={avatar} icon={<UserOutlined/>}/>}>
                <Menu.Item>
                    <Link to={`/setting`}>{userFullname}</Link>
                </Menu.Item>
                <Menu.Item danger>
                    <a onClick={onSignOut}>Đăng xuất</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default HeaderComponent;
