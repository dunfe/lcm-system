import * as React from 'react'
import { Table, Space, Modal, Form, Button, message, Tag } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestions, updateQuestions } from './questionsSlice'
import { status} from '../../utils/status'

interface IProps {
    onAdd: (state: any) => Promise<any>;
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const { useState, useEffect } = React
const { useForm } = Form
const { confirm } = Modal

const Questions = (props: IProps) => {
    const { setVisible } = props
    const dispatch = useDispatch()
    const data = useSelector(selectQuestions)
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return <Space size='middle' key={record._id}>
                    <Button type={'primary'} onClick={() => onEdit(record._id)}>Edit</Button>
                    <Button danger onClick={() => onDelete(record._id)}>Delete</Button>
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
                instance.delete(`/api/admin/questions/${id}`).then((response) => {
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
        instance.get(`/api/admin/questions?page=${current}`).then((response) => {
            dispatch(updateQuestions(response.data.results))
        }).catch((error) => console.error(error.message))
    }

    const expandRender = (record: any) => <p style={{ margin: 0 }}>{record.content}</p>

    useEffect(() => {
        if (updateId !== '') {
            instance.get(`/api/admin/questions/${updateId}`).then((response) => {
                if (response.status === 200) {
                    setItemDetail(response.data.results)
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
            <Table columns={columns}
                   expandable={{
                       expandedRowRender: expandRender,
                       rowExpandable: record => record.title !== 'Not Expandable',
                   }}
                   dataSource={data} rowKey={'_id'} pagination={{
                current: current,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Questions
