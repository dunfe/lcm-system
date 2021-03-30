import * as React from "react";
import {Table, Space} from "antd";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

const {useState, useEffect} = React;


const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
        render(text: string, record: any) {
            return <Space size="middle" key={record._id}>
                <a>Edit</a>
                <a>Delete</a>
            </Space>;
        },
    }
]
const Skills = () => {
    const [data, setData] = useState([]);
    const auth = useAuth();
    const instance = axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            'Authorization': auth?.user?.user.token,
        }
    })

    useEffect(() => {
        instance.get('/api/admin/skills').then((response) => {
            setData(response.data.skill);
        }).catch((error) => console.error(error.message));
    }, [])

    return (
        <Table columns={columns} dataSource={data} rowKey={'_id'}/>
    )
}

export default Skills;
