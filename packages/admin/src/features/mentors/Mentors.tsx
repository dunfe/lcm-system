import * as React from 'react'
import {
    Table,
    Space,
    Modal,
    Input,
    Button,
    message,
    Tag,
    Descriptions,
    Rate,
    Popconfirm,
} from 'antd'
import axios from 'axios'
import { useAuth } from '../../utils/hooks/useAuth'
import { IUserDetail } from '../../../../client/src/utils/hooks/useUserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { selectMentors, updateMentors } from './mentorsSlice'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import { useTrans } from 'common'

const { useState, useEffect } = React

const { Search } = Input

const Mentors = () => {
    const dispatch = useDispatch()

    const data = useSelector(selectMentors)
    const [updateId, setUpdateId] = useState('')
    const [itemDetail, setItemDetail] = useState<IUserDetail>()
    const [current, setCurrent] = useState(1)
    const [detail, setDetail] = useState(false)
    const [total, setTotal] = useState(0)

    const trans = useTrans()

    const auth = useAuth()
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
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
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render(text: string, record: any) {
                return <a onClick={() => onViewDetail(record._id)}>{text}</a>
            },
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render(text: string) {
                return (
                    <Tag color={text === 'banned' ? 'red' : 'green'}>
                        {text}
                    </Tag>
                )
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
                        {record.role === 'banned' ? null : ban(record._id)}
                    </Space>
                )
            },
            responsive: ['sm'] as Breakpoint[],
        },
    ]

    const ban = (id: string) => {
        return (
            <Popconfirm
                title={trans('Are you sure?')}
                onConfirm={() => onBan(id)}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>{trans('Ban')}</Button>
            </Popconfirm>
        )
    }

    const onViewDetail = (id: string) => {
        setUpdateId(id)
        setDetail(true)
    }

    const onBan = (id: string) => {
        instance
            .post(`/api/admin/users/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Banned')
                }
            })
            .then(() => getData())
            .catch((error) => console.error(error.message))
    }

    const onPageChange = (page: number) => {
        setCurrent(page)
    }

    const getData = () => {
        instance
            .get(`/api/admin/mentors?page=${current}`)
            .then((response) => {
                dispatch(updateMentors(response.data.results))
                setTotal(response.data.totalItem)
            })
            .catch((error) => console.error(error.message))
    }

    const handleDetailCancel = () => {
        setDetail(false)
        setUpdateId('')
    }

    const onSearch = (value: string) => {
        instance
            .get(`/api/admin/search/mentors?name=${value}`)
            .then((response) => {
                dispatch(updateMentors(response.data.results))
                setTotal(response.data.totalItem)
            })
            .catch((error) => console.error(error.message))
    }

    useEffect(() => {
        if (updateId !== '') {
            instance.get(`/api/admin/mentors/${updateId}`).then((response) => {
                if (response.status === 200) {
                    setItemDetail(response.data.data)
                }
            })
        }
    }, [updateId])

    useEffect(() => {
        getData()
    }, [current])

    return (
        <>
            <Modal
                width={800}
                title={itemDetail?.fullname}
                visible={detail}
                footer={null}
                onCancel={handleDetailCancel}
            >
                <Descriptions
                    key={itemDetail?._id}
                    className={'matching-description'}
                    bordered
                >
                    <Descriptions.Item label={'Email'} span={3}>
                        {itemDetail?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Role'} span={3}>
                        {itemDetail?.role}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Bio'} span={3}>
                        {itemDetail?.bio}
                    </Descriptions.Item>

                    <Descriptions.Item label={'Date of birth'} span={2}>
                        {itemDetail?.detail.dob}
                    </Descriptions.Item>

                    <Descriptions.Item label={'Current Point'}>
                        {itemDetail?.currentPoint}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Skill'} span={3}>
                        {itemDetail?.skill?.join(',')}
                    </Descriptions.Item>

                    <Descriptions.Item label={'Gender'}>
                        {itemDetail?.detail.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Total question'}>
                        {itemDetail?.detail.totalQuestion}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Rate'}>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Space>
                                <Rate value={5} />{' '}
                                {itemDetail?.rate.totalRating5}
                            </Space>
                            <Space>
                                <Rate value={4} />{' '}
                                {itemDetail?.rate.totalRating4}
                            </Space>
                            <Space>
                                <Rate value={3} />{' '}
                                {itemDetail?.rate.totalRating3}
                            </Space>
                            <Space>
                                <Rate value={2} />{' '}
                                {itemDetail?.rate.totalRating2}
                            </Space>
                            <Space>
                                <Rate value={1} />{' '}
                                {itemDetail?.rate.totalRating1}
                            </Space>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={'Phone'} span={2}>
                        {itemDetail?.detail.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Current Job'}>
                        {itemDetail?.detail.currentJob}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Achievement'} span={3}>
                        {itemDetail?.detail?.achievement?.map((item) => item)}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Github'} span={3}>
                        <a href={itemDetail?.github}>{itemDetail?.github}</a>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <Search
                style={{ paddingBottom: 12 }}
                placeholder="Enter mentor name"
                onSearch={onSearch}
                enterButton
            />
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    showSizeChanger: false,
                    current: current,
                    total,
                    onChange: onPageChange,
                    defaultPageSize: 10,
                }}
            />
        </>
    )
}

export default Mentors
