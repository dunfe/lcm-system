import * as React from 'react'
import { Table, Space } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'

const { useState, useEffect } = React

const Feedbacks = () => {
    const [data, setData] = useState([])
    const [current, setCurrent] = useState(1)

    const auth = useAuth()
    const instance = axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            'Authorization': auth?.user?.user.token,
        },
    })
    const columns = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return (current - 1) * 10 + index + 1
            },
        },
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
                return <Space size='middle' key={record._id}>
                    <a onClick={() => onResolved(record._id)}>Resolved</a>
                </Space>
            },
        },
    ]

    const onResolved = (id: string) => {
        console.log(id)
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const getData = () => {
        instance.get('/api/admin/reports').then((response) => {
            setData(response.data.data)
        }).catch((error) => console.error(error.message))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey={'_id'} pagination={{
                current: current,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Feedbacks
