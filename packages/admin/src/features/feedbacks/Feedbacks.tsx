import * as React from 'react'
import { Table, Space, Modal, Form, message } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { DeleteOutlined } from '@ant-design/icons'

interface IProps {
    onAdd: (state: any) => Promise<any>;
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const { useState, useEffect } = React
const { useForm } = Form
const { confirm } = Modal

const Feedbacks = (props: IProps) => {
    const { setVisible } = props
    const [data, setData] = useState([])
    const [mode, setMode] = useState('add')
    const [updateId, setUpdateId] = useState('')
    const [itemDetail, setItemDetail] = useState({})
    const [current, setCurrent] = useState(1)
    const [form] = useForm()

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
                    <a onClick={() => onEdit(record._id)}>Edit</a>
                    <a onClick={() => onDelete(record._id)}>Delete</a>
                </Space>
            },
        },
    ]

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance.delete(`/api/admin/skills/${id}`).then((response) => {
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

    const onEdit = (id: string) => {
        setMode('update')
        setUpdateId(id)
        setVisible(true)
    }

    const getData = () => {
        instance.get('/api/admin/reports').then((response) => {
            setData(response.data.skill)
        }).catch((error) => console.error(error.message))
    }

    useEffect(() => {
        if (updateId !== '') {
            instance.get(`/api/admin/skills/${updateId}`).then((response) => {
                if (response.status === 200) {
                    setItemDetail(response.data.data)
                }
            })
        }
    }, [updateId])

    useEffect(() => {
        if (mode === 'update') {
            form.setFieldsValue(itemDetail)
        }
    }, [itemDetail])

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
