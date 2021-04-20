import * as React from 'react'
import { Table, Space, Modal, Form, Input, Button, message, Tag } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'

interface IProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const { useState, useEffect } = React
const { useForm } = Form

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

const Mentees = (props: IProps) => {
    const { visible, setVisible } = props
    const [data, setData] = useState([])
    const [confirmLoading, setConfirmLoading] = React.useState(false)
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
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render(text: string) {
                return (
                    <Tag color={text === 'banned' ? 'red': 'green'}>
                        {text}
                    </Tag>
                )
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return <Space size='middle' key={record._id}>
                    <a onClick={() => onEdit(record._id)}>Edit</a>
                    <a onClick={() => onBan(record._id)}>Ban</a>
                </Space>
            },
        },
    ]

    const onBan = (id: string) => {
        instance.post(`/api/admin/users/${id}`).then((response) => {
            if (response.status === 200) {
                message.success('Banned')
            }
        }).then(() => getData()).catch((error) => console.error(error.message))
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
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
        instance.get('/api/admin/users').then((response) => {
            setData(response.data.results)
        }).catch((error) => console.error(error.message))
    }

    const onFinish = (values: any) => {
        setConfirmLoading(true)

        if (mode === 'update' && updateId !== '') {
            instance.put(`/api/admin/users/${updateId}`, values).then((response) => {
                if (response.status === 200) {
                    message.success('Cập nhật thành công').then(() => {
                        setVisible(false)
                    })
                }
            }).then(() => getData(),
            ).catch((error) => message.error(error.message))
        }

        setConfirmLoading(false)
    }

    useEffect(() => {
        if (updateId !== '') {
            instance.get(`/api/admin/users/${updateId}`).then((response) => {
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
        if (!visible) {
            getData()
        }
    }, [visible])

    return (
        <>
            <Modal
                title='Sửa thông tin'
                visible={visible}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name='add'
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Tên'
                        name='fullname'
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} rowKey={'_id'} pagination={{
                current: current,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Mentees
