import * as React from 'react'
import { Table, Space, Modal, Form, Input, Button, message, Tag, Descriptions, Rate } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'
import { IUserDetail } from '../../../../client/src/utils/hooks/useUserInfo'

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
    const [itemDetail, setItemDetail] = useState<IUserDetail>()
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [detail, setDetail] = useState(false)

    const [form] = useForm()

    const instance = useAPI()
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
            render(text: string, record: any) {
                return (
                    <a onClick={() => onViewDetail(record._id)}>{text}</a>
                )
            }
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
                    <Button type={'primary'} onClick={() => onEdit(record._id)}>Edit</Button>
                    <Button danger onClick={() => onBan(record._id)}>Ban</Button>
                </Space>
            },
        },
    ]

    const onViewDetail = (id: string) => {
        setUpdateId(id)
        setDetail(true)
    }

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

    const handleDetailCancel = () => {
        setDetail(false)
        setUpdateId('')
    }

    const getData = () => {
        instance.get(`/api/admin/users?page=${current}`).then((response) => {
            setData(response.data.results)
            setTotal(response.data.totalItem)
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
        if (!visible) {
            getData()
        }
    }, [visible, current])

    return (
        <>
            <Modal
                width={1000}
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
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Space><Rate value={5}/> {itemDetail?.rate.totalRating5}</Space>
                            <Space><Rate value={4}/> {itemDetail?.rate.totalRating4}</Space>
                            <Space><Rate value={3}/> {itemDetail?.rate.totalRating3}</Space>
                            <Space><Rate value={2}/> {itemDetail?.rate.totalRating2}</Space>
                            <Space><Rate value={1}/> {itemDetail?.rate.totalRating1}</Space>
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
                total,
                onChange: onPageChange,
                defaultPageSize: 10,
            }} />
        </>
    )
}

export default Mentees
