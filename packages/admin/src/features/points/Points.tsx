import * as React from 'react'
import {
    Table,
    Tag,
    Button,
    Space,
    message,
    Modal,
    Form,
    Input,
    InputNumber,
} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectPoints, updatePoints } from './pointsSlice'
import { useAPI } from '../../utils/hooks/useAPI'
import { status } from '../../utils/status'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'

const { useState, useEffect } = React

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
}

const Points = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectPoints)
    const instance = useAPI()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [mode, setMode] = useState('add')
    const [updateId, setUpdateId] = useState('')

    const [form] = useForm()

    const [expandId, setExpandId] = useState('')
    const [pointOutData, setPointOutData] = useState([])
    const [pointInData, setPointInData] = useState([])

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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: 'Current Point',
            dataIndex: 'currentPoint',
            key: 'currentPoint',
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
                                {record.status}
                            </Tag>
                        )
                    }
                })
            },
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Action',
            key: 'action',
            render(text: string, record: any) {
                return (
                    <Space>
                        <Button
                            type={'primary'}
                            onClick={() => onAdd(record._id)}
                        >
                            Add
                        </Button>
                        <Button danger onClick={() => onMinus(record._id)}>
                            Minus
                        </Button>
                    </Space>
                )
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    const onAdd = (id: string) => {
        setIsModalVisible(true)
        setMode('add')
        setUpdateId(id)
    }

    const onMinus = (id: string) => {
        setIsModalVisible(true)
        setMode('minus')
        setUpdateId(id)
    }

    const onUpdate = () => {
        form.validateFields()
            .then((values) => {
                instance
                    .post(
                        `/api/staff/${
                            mode === 'add' ? 'pointIn' : 'pointOut'
                        }/${updateId}`,
                        values
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            message.success(mode === 'add' ? 'Added' : 'Minus')
                        }
                    })
                    .catch(() => message.error('Failed'))
            })
            .then(() => {
                getData()
                setIsModalVisible(false)
            })
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const getData = () => {
        instance
            .get(`/api/staff/users?page=${current}`)
            .then((response) => {
                dispatch(updatePoints(response.data.results))
                setTotal(response.data.totalItem)
            })
            .catch((error) => console.error(error.message))
    }

    const expandedRowRender = () => {
        const expandColumns = [
            {
                title: 'Time',
                dataIndex: 'createAt',
                key: 'createAt',
                render(text: string) {
                    return dayjs(text).format('LLLL')
                },
                responsive: ['lg'] as Breakpoint[],
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render(text: string) {
                    return <Tag>{text}</Tag>
                },
                responsive: ['lg'] as Breakpoint[],
            },
            {
                title: 'Money',
                dataIndex: 'money',
                key: 'money',
                responsive: ['lg'] as Breakpoint[],
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                responsive: ['lg'] as Breakpoint[],
            },
            {
                title: 'Before',
                dataIndex: 'pointBefore',
                key: 'pointBefore',
                responsive: ['sm'] as Breakpoint[],
            },
            {
                title: 'After',
                dataIndex: 'pointAfter',
                key: 'pointAfter',
                render(text: string, record: any) {
                    if (record.type === 'in') {
                        return (
                            <>
                                <ArrowUpOutlined style={{ color: 'green' }} />{' '}
                                {text}
                            </>
                        )
                    } else {
                        return (
                            <>
                                <ArrowDownOutlined style={{ color: 'red' }} />{' '}
                                {text}
                            </>
                        )
                    }
                },
                responsive: ['sm'] as Breakpoint[],
            },
            {
                title: 'Note',
                dataIndex: 'note',
                key: 'note',
                responsive: ['lg'] as Breakpoint[],
            },
        ]

        const expandData = [...pointInData, ...pointOutData]

        return (
            <Table
                columns={expandColumns}
                dataSource={expandData}
                pagination={false}
            />
        )
    }

    const onExpand = (expanded: boolean, record: any) => {
        if (expanded && record._id) {
            setExpandId(record._id)
        }
    }

    useEffect(() => {
        if (!expandId || expandId === '') {
            return
        }
        const getExpandPointOutData = () => {
            instance
                .get(`/api/staff/viewPointOut/${expandId}`)
                .then((response) => {
                    const results = response.data.data.pointOutHistory.map(
                        (item: any) => {
                            return {
                                ...item,
                                type: 'out',
                            }
                        }
                    )
                    setPointOutData(results)
                })
                .catch((error) => console.error(error.message))
        }

        const getExpandPointInData = () => {
            instance
                .get(`/api/staff/viewPointIn/${expandId}`)
                .then((response) => {
                    const results = response.data.data.pointInHistory.map(
                        (item: any) => {
                            return {
                                ...item,
                                type: 'in',
                            }
                        }
                    )
                    setPointInData(results)
                })
                .catch((error) => console.error(error.message))
        }

        getExpandPointInData()
        getExpandPointOutData()
    }, [expandId])

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Table
                columns={columns}
                expandable={{ expandedRowRender, onExpand }}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    current: current,
                    total,
                    onChange: onPageChange,
                    defaultPageSize: 10,
                }}
            />
            <Modal
                title={mode === 'add' ? 'Add Point' : 'Minus Point'}
                visible={isModalVisible}
                footer={[
                    <Button key={'1'} onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button type={'primary'} key={'2'} onClick={onUpdate}>
                        {mode === 'add' ? 'Add' : 'Minus'}
                    </Button>,
                ]}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form {...layout} form={form} name={'update'}>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            { required: true, message: 'Please input amount!' },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Method"
                        name="method"
                        rules={[
                            { required: true, message: 'Please input method!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Note" name="note">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Points
