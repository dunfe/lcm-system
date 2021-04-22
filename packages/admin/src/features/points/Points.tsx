import * as React from 'react'
import { Table, Space, Modal, Button, message, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectPoints, updatePoints } from './pointsSlice'
import { requestStatus } from '../../utils/requestStatus'
import { useAPI } from '../../utils/hooks/useAPI'
import { status } from '../../utils/status'

const { useState, useEffect } = React
const { confirm } = Modal

const Points = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectPoints)
    const instance = useAPI()

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)

    const columns = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return (current - 1) * 10 + index + 1
            },
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Current Point',
            dataIndex: 'currentPoint',
            key: 'currentPoint',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => {
                return status.map((item) => {
                    if (item.value === record.status) {
                        return (
                            <Tag color={item.color} key={record._id}>
                                {record.status}
                            </Tag>
                        )
                    }
                })
            },
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return <Space size='middle' key={record._id}>
                    <Button danger onClick={() => onUpdate(record._id)}>Update</Button>
                </Space>
            },
        },
    ]

    const onUpdate = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance.delete(`/api/admin/requests/${id}`).then((response) => {
                    if (response.status === 200) {
                        getData()
                        message.success('Xoá thành công').then()
                    }
                }).catch((error) => message.error(error.message))
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
        instance.get(`/api/staff/users?page=${current}`).then((response) => {
            dispatch(updatePoints(response.data.results))
            setTotal(response.data.totalItem)
        }).catch((error) => console.error(error.message))
    }

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Table columns={columns}
                   dataSource={data} rowKey={'_id'} pagination={{
                current: current,
                total,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Points
