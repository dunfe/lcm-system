import {
    deleteQuestion,
    getDone,
    getNew,
    selectNewQuestion,
    selectOldQuestion,
    selectQuestionsStatus,
    selectTotalNewQuestion,
    selectTotalOldQuestion,
} from './questionSlice'
import { useAPI } from '../../utils/hooks/useAPI'
import QuestionDetail from '../../components/Question/QuestionDetail'
import { useToken } from '../../utils/hooks/useToken'
import { status } from '../../utils/status'
import * as React from 'react'
import { Tabs, Table, Skeleton, Modal, message, Tag, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'

const { TabPane } = Tabs
const { confirm } = Modal

const { useEffect, useState } = React

const ListQuestion = () => {
    const instance = useAPI()
    const { t } = useTranslation()
    const token = useToken()

    const newQuestion = useSelector(selectNewQuestion)
    const oldQuestion = useSelector(selectOldQuestion)
    const questionsStatus = useSelector(selectQuestionsStatus)
    const totalNew = useSelector(selectTotalNewQuestion)
    const totalDone = useSelector(selectTotalOldQuestion)

    const dispatch = useDispatch()
    const [currentNew, setCurrentNew] = useState(1)
    const [currentDone, setCurrentDone] = useState(1)
    const [selectedId, setSelectedId] = useState<string>('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState('detail')

    const columns = (current: number) => [
        {
            title: t('No'),
            width: '5%',
            render(text, record, index) {
                return (current - 1) * 10 + index + 1
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: t('Title'),
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            render(text, record) {
                return <a onClick={() => showModal(record._id)}>{text}</a>
            },
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: t('Point'),
            dataIndex: 'point',
            key: 'point',
            sorter: (a, b) => a.point - b.point,
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
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
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: t('Action'),
            key: 'action',
            render(text, record): JSX.Element {
                const available = record.status === 'new'
                return (
                    <div>
                        <Button
                            type="primary"
                            disabled={!available}
                            onClick={() => showEdit(record._id)}
                        >
                            {t('Edit')}
                        </Button>
                        <Button
                            style={{
                                marginLeft: 12,
                            }}
                            type="dashed"
                            danger
                            disabled={!available}
                            onClick={() => onDelete(record._id)}
                        >
                            {t('Delete')}
                        </Button>
                    </div>
                )
            },
            responsive: ['lg'] as Breakpoint[],
        },
    ]

    const onDelete = (id: string) => {
        confirm({
            title: t('Are you sure delete this question?'),
            icon: <DeleteOutlined />,
            okText: t('Yes'),
            okType: 'danger',
            cancelText: t('No'),
            onOk() {
                instance
                    .delete(`/api/users/questions/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            dispatch(deleteQuestion(id))
                            message.success(t('Delete successfully'))
                        } else {
                            message.error(response.data.message ?? t('Failed'))
                        }
                    })
                    .then(() => handleCancel())
                    .catch((error) => console.error(error))
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const showEdit = (id: string) => {
        setMode('edit')
        setIsModalVisible(true)
        setSelectedId(id)
    }

    const showModal = (id: string) => {
        setMode('detail')
        setIsModalVisible(true)
        setSelectedId(id)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onNewPageChange = (page) => {
        setCurrentNew(page)
        if (token) {
            dispatch(getNew({ token, page }))
        }
    }

    const onDonePageChange = (page) => {
        setCurrentDone(page)
        if (token) {
            dispatch(getDone({ token, page }))
        }
    }

    useEffect(() => {
        if (!isModalVisible && token) {
            dispatch(getNew({ token, page: 1 }))
            dispatch(getDone({ token, page: 1 }))
        }
    }, [isModalVisible])

    useEffect(() => {
        if (questionsStatus === 'loading') {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [questionsStatus])

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab={t('New')} key="1">
                    {loading ? (
                        <Skeleton active={true} />
                    ) : (
                        <Table
                            columns={columns(currentNew)}
                            dataSource={newQuestion}
                            rowKey={'_id'}
                            pagination={{
                                current: currentNew,
                                pageSize: 10,
                                onChange: onNewPageChange,
                                total: totalNew,
                            }}
                        />
                    )}
                </TabPane>
                <TabPane tab={t('Done')} key="2">
                    {loading ? (
                        <Skeleton active={true} />
                    ) : (
                        <Table
                            columns={columns(currentDone)}
                            dataSource={oldQuestion}
                            rowKey={'_id'}
                            pagination={{
                                current: currentDone,
                                pageSize: 10,
                                onChange: onDonePageChange,
                                total: totalDone,
                            }}
                        />
                    )}
                </TabPane>
            </Tabs>
            <QuestionDetail
                mode={mode}
                setMode={setMode}
                selectedId={selectedId}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default ListQuestion
