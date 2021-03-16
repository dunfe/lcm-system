import * as React from "react";
import {Table, Space} from "antd";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

const {useState, useEffect} = React;


const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: 'index',
    },
    {
        title: 'Tên',
        dataIndex: 'skill_name',
        key: 'name',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render(text, record) {
            return <Space size="middle">
                <a>Edit {record.name}</a>
                <a>Delete</a>
            </Space>;
        },
    }
]
const Skills = () => {
    const [data, setData] = useState([]);
    const auth = useAuth();
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Authorization': auth?.user?.user.token,
        }
    })

    useEffect(() => {
        instance.get('/admin/skills/all').then((response) => {
            setData(response.data.data);
        }).catch((error) => console.error(error.message));
    }, [])

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default Skills;