import * as React from "react";
import {Badge, Dropdown, Menu} from "antd";
import {BellOutlined} from "@ant-design/icons";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

interface INotify {
    read: boolean,
    _id: string,
    title: string,
    receivedById: string,
    content: string,
    createdAt: string,
    __v: number
}

const {useState, useEffect} = React;

const instance = axios.create({baseURL: 'https://livecoding.me'});

const Notify = () => {
    const auth = useAuth();
    const [notify, setNotify] = useState<INotify[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        instance.get('/api/users/notify', {
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

    const menu = (
        <Menu>
            {_notify}
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger={['click']}>
                        <span className={'header-notify-icon'}>
                            <Badge count={count} showZero={true}>
                                <BellOutlined style={{fontSize: 24, color: 'white'}}/>
                            </Badge>
                        </span>
        </Dropdown>
    )
};

export default Notify;
