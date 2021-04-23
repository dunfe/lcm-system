import * as React from 'react'
import { Table, Tag } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectPoints, updatePoints } from './pointsSlice'
import { useAPI } from '../../utils/hooks/useAPI'
import { status } from '../../utils/status'
import dayjs from 'dayjs'

const { useState, useEffect } = React

const Points = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectPoints)
    const instance = useAPI()

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)

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
        }
    ]

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const getData = () => {
        instance.get(`/api/staff/users?page=${current}`).then((response) => {
            dispatch(updatePoints(response.data.results))
            setTotal(response.data.totalItem)
        }).catch((error) => console.error(error.message))
    }

    const expandedRowRender = () => {
        const expandColumns = [
            {
                title: 'Time', dataIndex: 'createAt', key: 'createAt', render(text: string) {
                    return dayjs(text).format('LLLL')
                },
            },
            {
                title: 'Amount', dataIndex: 'amount', key: 'amount', render(text: string) {
                    return (
                        <Tag>
                            {text}
                        </Tag>
                    )
                },
            },
            { title: 'Money', dataIndex: 'money', key: 'money' },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
            },
            {
                title: 'Before',
                dataIndex: 'pointBefore',
                key: 'pointBefore',
            },
            {
                title: 'After',
                dataIndex: 'pointAfter',
                key: 'pointAfter',
                render(text: string, record: any) {
                    if (record.type === 'in') {
                        return (
                            <>
                                <ArrowUpOutlined style={{ color: 'green' }} /> {text}
                            </>
                        )
                    } else {
                        return (
                            <>
                                <ArrowDownOutlined style={{ color: 'red' }} /> {text}
                            </>
                        )
                    }
                },
            },
            { title: 'Note', dataIndex: 'note', key: 'note' },
        ]

        const expandData = [...pointInData, ...pointOutData]

        return <Table columns={expandColumns} dataSource={expandData} pagination={false} />
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
            instance.get(`/api/staff/viewPointOut/${expandId}`).then((response) => {
                const results = response.data.data.pointOutHistory.map((item: any) => {
                    return {
                        ...item,
                        type: 'out',
                    }
                })
                setPointOutData(results)
            }).catch((error) => console.error(error.message))
        }

        const getExpandPointInData = () => {
            instance.get(`/api/staff/viewPointIn/${expandId}`).then((response) => {
                const results = response.data.data.pointInHistory.map((item: any) => {
                    return {
                        ...item,
                        type: 'in',
                    }
                })
                setPointInData(results)
            }).catch((error) => console.error(error.message))
        }

        getExpandPointInData()
        getExpandPointOutData()
    }, [expandId])

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Table columns={columns}
                   expandable={{ expandedRowRender, onExpand }}
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
