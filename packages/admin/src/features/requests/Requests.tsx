import * as React from 'react'
import { Table, Space, Modal, Button, message, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequests, updateRequests } from './requestsSlice'
import { requestStatus } from '../../utils/requestStatus'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import { useTrans } from 'common'
import { useAPI } from '../../utils/hooks/useAPI'
import dayjs from 'dayjs'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const { useState, useEffect } = React
const { confirm } = Modal

const Requests = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectRequests)
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const trans = useTrans()
    const instance = useAPI()

    const [selectedId, setSelectedId] = useState('')
    const [resumeView, setResumeView] = useState(false)
    const [resumeUrl, setResumeUrl] = useState('')

    const [numPages, setNumPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)

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
            title: trans('User'),
            dataIndex: 'createdName',
            key: 'createdName',
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: trans('Title'),
            dataIndex: 'title',
            key: 'title',
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: trans('Create at'),
            dataIndex: 'createAt',
            key: 'createAt',
            responsive: ['md'] as Breakpoint[],
            render(text) {
                return dayjs(text).format('LLLL')
            },
        },
        {
            title: trans('Resume'),
            key: 'resume',
            responsive: ['sm'] as Breakpoint[],
            render(record) {
                return (
                    <Button onClick={() => onResumeView(record._id)}>
                        {trans('View')}
                    </Button>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => {
                return requestStatus.map((item) => {
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
                        <Button
                            disabled={record.status === 'approved'}
                            type={'primary'}
                            onClick={() => onApprove(record._id)}
                        >
                            Approve
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

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    const onResumeView = (id: string) => {
        setSelectedId(id)
        setResumeView(true)
    }

    const onResumeViewCancel = () => {
        setResumeView(false)
    }

    const onApprove = (id: string) => {
        instance
            .post(`/api/admin/requests/${id}`)
            .then((response) => {
                if (response) {
                    message.success('Approved')
                    getData()
                }
            })
            .catch((error) => console.error(error.message))
    }

    const onDelete = (id: string) => {
        confirm({
            title: 'Xác nhận?',
            icon: <DeleteOutlined />,
            content: 'Hành động này không thể khôi phục',
            onOk() {
                instance
                    .delete(`/api/admin/requests/${id}`)
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
            .get(`/api/admin/requests?page=${current}`)
            .then((response) => {
                dispatch(updateRequests(response.data.results))
                setTotal(response.data.totalPage * 10)
            })
            .catch((error) => console.error(error.message))
    }

    const expandRender = (record: any) => (
        <p style={{ margin: 0 }}>{record.content}</p>
    )

    const onNext = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const onPrev = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    const documentFooter = () => {
        if (numPages > 1) {
            return (
                <>
                    <Button onClick={onNext}>{trans('Next')}</Button>
                    <Button onClick={onPrev}>{trans('Prev')}</Button>
                </>
            )
        }
    }

    useEffect(() => {
        getData()
    }, [current])

    useEffect(() => {
        if (selectedId !== '') {
            const selectedUser = data.filter((item) => item._id === selectedId)

            if (selectedUser.length > 0) {
                setResumeUrl(selectedUser[0].cv)
            }
        }
    }, [selectedId])

    return (
        <>
            <Modal
                width={800}
                title={'Resume'}
                visible={resumeView}
                onCancel={onResumeViewCancel}
                footer={
                    <Button onClick={onResumeViewCancel}>
                        {trans('Cancel')}
                    </Button>
                }
            >
                <Document
                    file={resumeUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                {documentFooter()}
            </Modal>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: expandRender,
                    rowExpandable: (record) =>
                        record.title !== 'Not Expandable',
                }}
                dataSource={data}
                rowKey={'_id'}
                pagination={{
                    current: current,
                    total,
                    onChange: onPageChange,
                    defaultPageSize: 10,
                }}
            />
        </>
    )
}

export default Requests
