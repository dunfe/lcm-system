import * as React from 'react'
import { Table, Space, Modal, Button, message, Tag } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequests, updateRequests } from './requestsSlice'
import { requestStatus } from '../../utils/requestStatus'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import { useToken } from '../../utils/hooks/useToken'

const { useState, useEffect } = React
const { confirm } = Modal

const Requests = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectRequests)
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const token = useToken()

    const instance = axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            Authorization: token,
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => {
                return requestStatus.map((item) => {
                    if (item.value === record.status) {
                        return (
                            <Tag color={item.color} key={record._id}>
                                {record.status.toUpperCase()}
                            </Tag>
                        )
                    }
                })
            },
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return (
                    <Space size="middle" key={record._id}>
                        <Button
                            disabled={record.status === 'approved'}
                            type={'primary'}
                            onClick={() => onApprove(record._id)}
                        >
                            Approve
                        </Button>
                        <Button danger onClick={() => onDelete(record._id)}>
                            Delete
                        </Button>
                    </Space>
                )
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    const onApprove = (id: string) => {
        instance
            .post(`/api/admin/requests/${id}`)
            .then((response) => {
                if (response) {
                    message.success('Approved')
                    getData()
                }
            })
            .catch((error) => console.error(error.message))
    }

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance
                    .delete(`/api/admin/requests/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            getData()
                            message.success('Xoá thành công').then()
                        }
                    })
                    .catch((error) => message.error(error.message))
            },
            onCancel() {
                console.log('Huỷ')
            },
        })
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const getData = () => {
        instance
            .get(`/api/admin/requests?page=${current}`)
            .then((response) => {
                dispatch(updateRequests(response.data.results))
                setTotal(response.data.totalPage * 10)
            })
            .catch((error) => console.error(error.message))
    }

    const expandRender = (record: any) => (
        <p style={{ margin: 0 }}>{record.content}</p>
    )

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: expandRender,
                    rowExpandable: (record) =>
                        record.title !== 'Not Expandable',
                }}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    current: current,
                    total,
                    onChange: onPageChange,
                    defaultPageSize: 10,
                }}
            />
        </>
    )
}

export default Requests
