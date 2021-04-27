import * as React from 'react'
import { Table, Space, Modal, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkills, updateSkills } from './skillsSlice'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'

interface IProps {
    onAdd: (state: any) => Promise<any>
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

const Skills = (props: IProps) => {
    const { onAdd, visible, setVisible } = props
    const dispatch = useDispatch()
    const data = useSelector(selectSkills)
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
            Authorization: auth?.user?.user.token,
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
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            responsive: ['sm'] as Breakpoint[],
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
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return (
                    <Space size="middle" key={record._id}>
                        <Button
                            type={'primary'}
                            onClick={() => onEdit(record._id)}
                        >
                            Edit
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

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance
                    .delete(`/api/admin/skills/${id}`)
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
        instance
            .get('/api/admin/skills')
            .then((response) => {
                dispatch(updateSkills(response.data.skill))
            })
            .catch((error) => console.error(error.message))
    }

    const onFinish = (values: any) => {
        setConfirmLoading(true)

        if (mode === 'update' && updateId !== '') {
            instance
                .put(`/api/admin/skills/${updateId}`, values)
                .then((response) => {
                    if (response.status === 200) {
                        getData()
                        message.success('Cập nhật thành công').then(() => {
                            setVisible(false)
                        })
                    }
                })
                .catch((error) => message.error(error.response.data.message))
        } else {
            onAdd(values)
                .then((response) => {
                    if (response.status === 200) {
                        getData()
                        message.success('Thêm thành công').then(() => {
                            setVisible(false)
                        })
                    }
                })
                .catch((error) => message.error(error.response.data.message))
        }

        setConfirmLoading(false)
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
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    current: current,
                    onChange: onPageChange,
                    defaultPageSize: 10,
                }}
            />
        </>
    )
}

export default Skills
