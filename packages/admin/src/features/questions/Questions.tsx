import * as React from 'react'
import { Table, Space, Modal, Button, message, Tag } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestions, updateQuestions } from './questionsSlice'
import { status } from '../../utils/status'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import { useToken } from '../../utils/hooks/useToken'
import { Preview } from 'common'

const { useState, useEffect } = React
const { confirm } = Modal

const Questions = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectQuestions)
    const token = useToken()
    const [current, setCurrent] = useState(1)

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
            responsive: ['md'] as Breakpoint[],
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
                return status.map((item) => {
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
                        <Button danger onClick={() => onDelete(record._id)}>
                            Delete
                        </Button>
                    </Space>
                )
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance
                    .delete(`/api/admin/questions/${id}`)
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
            .get(`/api/admin/questions?page=${current}`)
            .then((response) => {
                dispatch(updateQuestions(response.data.results))
            })
            .catch((error) => console.error(error.message))
    }

    const expandRender = (record: any) => <Preview content={record.content} />

    useEffect(() => {
        getData()
    }, [])

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: expandRender,
                rowExpandable: (record) => record.title !== 'Not Expandable',
            }}
            dataSource={data}
            rowKey={'_id'}
            pagination={{
                current: current,
                onChange: onPageChange,
                defaultPageSize: 10,
            }}
        />
    )
}

export default Questions
