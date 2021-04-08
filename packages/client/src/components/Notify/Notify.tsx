import * as React from "react";
import {Badge, Dropdown, Menu} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {io} from "socket.io-client";
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

const {useState, useEffect} = React;

const instance = axios.create({baseURL: 'http://localhost:3000'});

const Notify = () => {
    const [notify] = useState<INotify[]>([]);

    useEffect(() => {
        const socket = io('ws://localhost:3007');
        socket.on('news', (data) => {
            console.log(data);
        })
    }, []);

    const test = () => {
        instance.get('/api/users/notify').then((response) => {
            console.log(response.data);
        })
    }

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
                                <BellOutlined style={{fontSize: 24, color: 'white'}} onClick={() => test()}/>
                            </Badge>
                        </span>
        </Dropdown>
    )
};

export default Notify;
