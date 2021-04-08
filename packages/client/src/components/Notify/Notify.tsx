import * as React from "react";
import {Badge, Dropdown, Menu} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {io} from "socket.io-client";

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

const Notify = () => {
    const [notify, setNotify] = useState<INotify[]>([]);

    useEffect(() => {
        const socket = io('wss://localhost:3000');
        socket.on('news', (data) => {
            setNotify(data);
        })
    }, []);

    const _notify = notify.map((item) => (
        <Menu.Item key={item._id}>
            item.title
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
                            <Badge count={5} showZero={true}>
                                <BellOutlined style={{fontSize: 24, color: 'white'}}/>
                            </Badge>
                        </span>
        </Dropdown>
    )
};

export default Notify;
