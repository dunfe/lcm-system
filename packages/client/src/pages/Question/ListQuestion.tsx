import * as React from "react";
import {Tabs, Table} from "antd";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

export interface IData {
    receivedBy: string[];
    point: number;
    skill: string[];
    time: number;
    status: string;
    _id: string;
    title: string;
    menteeId: string;
    menteeName: string;
    content: string;
    note: string;
    createAt: string;
    __v: number
}
const {TabPane} = Tabs;

const {useEffect, useState} = React;

const ListQuestion = () => {
    const auth = useAuth();

    const [data, setData] = useState<IData[]>([]);

    const instance = axios.create({ baseURL: 'https://livecoding.me' });

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    useEffect(() => {
        instance.get('/api/users/questions', {
            headers: {
                'Authorization': auth.user?.user.token,
            }
        }).then((response) => {
            if ( response.status === 200) {
                setData(response.data.data.results);
            }
        }).catch((error) => console.error(error.message))
    }, []);

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Đang chờ" key="1">
                <Table columns={columns} dataSource={data} rowKey={'_id'}/>
            </TabPane>
            <TabPane tab="Đã trả lời" key="2">
                <Table columns={columns} dataSource={data} rowKey={'_id'}/>
            </TabPane>
        </Tabs>
    )
};

export default ListQuestion;
