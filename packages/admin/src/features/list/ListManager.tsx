import * as React from 'react'
import { Table, Space, Modal, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { DeleteOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

interface IProps {
    onAdd?: (state: any) => Promise<any>
    visible: boolean
    setVisible: (state: boolean) => void
}

const { useState, useEffect } = React
const { useForm } = Form
const { confirm } = Modal

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

const ListManager = (props: IProps) => {
    const { onAdd, visible, setVisible } = props
    const [data, setData] = useState([])
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const [mode, setMode] = useState('add')
    const [updateId, setUpdateId] = useState('')
    const [itemDetail, setItemDetail] = useState({})
    const location = useLocation()
    const [endpoint, setEndPoint] = useState('')
    const [columns, setColumns] = useState<any>([])
    const [form] = useForm()

    const auth = useAuth()
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: auth?.user?.user.token,
        },
    })

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance
                    .delete(`/api/admin${endpoint}/${id}`)
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

    const onEdit = (id: string) => {
        setMode('update')
        setUpdateId(id)
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
        setMode('add')
        setUpdateId('')
    }

    const getData = () => {
        if (endpoint === '') {
            return
        }
        instance
            .get(`/api/admin${endpoint}`)
            .then((response) => {
                setData(response.data.skill)
            })
            .catch((error) => console.error(error.message))
    }

    const onFinish = (values: any) => {
        setConfirmLoading(true)

        if (mode === 'update' && updateId !== '') {
            instance
                .put(`/api/admin${endpoint}/${updateId}`, values)
                .then((response) => {
                    if (response.status === 200) {
                        getData()
                        message.success('Cập nhật thành công').then(() => {
                            setVisible(false)
                        })
                    }
                })
                .catch((error) => message.error(error.message))
        } else {
            if (onAdd) {
                onAdd(values)
                    .then((response) => {
                        if (response.status === 200) {
                            getData()
                            message.success('Thêm thành công').then(() => {
                                setVisible(false)
                            })
                        }
                    })
                    .catch((error) => message.error(error.message))
            }
        }

        setConfirmLoading(false)
    }

    useEffect(() => {
        if (updateId !== '') {
            instance
                .get(`/api/admin${endpoint}${updateId}`)
                .then((response) => {
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
        switch (endpoint) {
            case 'skills':
                setColumns([
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
                            return (
                                <Space size="middle" key={record._id}>
                                    <a onClick={() => onEdit(record._id)}>
                                        Edit
                                    </a>
                                    <a onClick={() => onDelete(record._id)}>
                                        Delete
                                    </a>
                                </Space>
                            )
                        },
                    },
                ])
                break
            case 'users':
                setColumns([
                    {
                        title: 'Tên',
                        dataIndex: 'fullname',
                        key: 'fullname',
                    },
                    {
                        title: 'ID',
                        dataIndex: '_id',
                        key: '_id',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Hành động',
                        dataIndex: 'action',
                        key: 'action',
                        render(text: string, record: any) {
                            return (
                                <Space size="middle" key={record._id}>
                                    <a onClick={() => onEdit(record._id)}>
                                        Edit
                                    </a>
                                </Space>
                            )
                        },
                    },
                ])
                break
            case 'mentors':
                setColumns([
                    {
                        title: 'Tên',
                        dataIndex: 'fullname',
                        key: 'fullname',
                    },
                    {
                        title: 'ID',
                        dataIndex: '_id',
                        key: '_id',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Hành động',
                        dataIndex: 'action',
                        key: 'action',
                        render(text: string, record: any) {
                            return (
                                <Space size="middle" key={record._id}>
                                    <a onClick={() => onEdit(record._id)}>
                                        Edit
                                    </a>
                                </Space>
                            )
                        },
                    },
                ])
                break
            case 'feedback':
                setColumns([
                    {
                        title: 'ID',
                        dataIndex: '_id',
                        key: '_id',
                    },
                ])
                break
        }

        getData()
    }, [endpoint])

    useEffect(() => {
        if (!location.pathname) {
            return
        }
        if (location.pathname === '/mentees') {
            setEndPoint('/users')
            return
        }
        setEndPoint(location.pathname)
    }, [location.pathname])

    return (
        <>
            {endpoint.match('(\\/[skills])\\w+') ? (
                <Modal
                    title="Thêm kỹ năng"
                    visible={visible}
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form
                        {...layout}
                        name="add"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên kỹ năng',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            ) : null}
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    defaultPageSize: 50,
                }}
            />
        </>
    )
}

export default ListManager
