import * as React from 'react'
import { Table, Space, message, Tag, Button } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'

const { useState, useEffect } = React

dayjs.extend(LocalizedFormat)

export interface IFeedback {
    'img': string[],
    '_id': string,
    'title': string,
    'createBy': string,
    'content': string,
    'createdAt': string,
    '__v': number
}

const Feedbacks = () => {
    const [data, setData] = useState<IFeedback[]>([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)

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
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render(text: string) {
                return dayjs(text).format('LLLL')
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render(text: string, record: any) {
                return (
                    <Tag color={record.status === 'open' ? 'green' : 'red'}>
                        {text}
                    </Tag>
                )
            },
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return <Space size='middle' key={record._id}>
                    <Button disabled={record.status !== 'open'} type={'primary'} onClick={() => onResolved(record._id)}>Resolved</Button>
                </Space>
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    const onResolved = (id: string) => {
        instance.post(`/api/admin/reports/${id}`).then((response) => {
            if (response.status === 200) {
                message.success('Resolved')
            }
        }).then(() => getData()).catch((error) => console.error(error.message))
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const expandRender = (record: any) => <p style={{ margin: 0 }}>{record.content}</p>

    const getData = () => {
        instance.get(`/api/admin/reports?page=${current}`).then((response) => {
            setData(response.data.results)
            setTotal(response.data.totalItem)
        }).catch((error) => console.error(error.message))
    }

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Table columns={columns}
                   expandable={{
                       expandedRowRender: expandRender,
                       rowExpandable: (record) => record.title !== 'Not Expandable',
                   }}
                   dataSource={data} rowKey={'_id'} pagination={{
                current: current,
                total: total,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Feedbacks
