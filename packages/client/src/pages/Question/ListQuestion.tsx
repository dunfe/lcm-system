import * as React from 'react'
import { Tabs, Table, Skeleton, Space, Modal, message } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'
import QuestionDetail from '../../components/Question/QuestionDetail'
import { useTranslation } from 'react-i18next'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    get,
    selectNewQuestion,
    selectOldQuestion,
    selectQuestionsStatus,
} from './questionSlice'
import { useToken } from '../../utils/hooks/useToken'

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

    const dispatch = useDispatch()
    const [selectedId, setSelectedId] = useState<string>('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const columns = [
        {
            title: t('Title'),
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: 800,
            render(text, record) {
                return <a onClick={() => showModal(record._id)}>{text}</a>
            },
        },
        {
            title: t('Point'),
            dataIndex: 'point',
            key: 'point',
            sorter: (a, b) => a.point - b.point,
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: t('Action'),
            key: 'action',
            render(text, record): JSX.Element {
                return (
                    <Space size="middle">
                        <a onClick={() => showEdit()}>{t('Edit')}</a>
                        <a onClick={() => onDelete(record._id)}>
                            {t('Delete')}
                        </a>
                    </Space>
                )
            },
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

    const showEdit = () => {
        return (
            <Modal
                style={{ minWidth: 600 }}
                title={'Test'}
                visible={isModalVisible}
                onCancel={handleCancel}
            >
                test
            </Modal>
        )
    }

    const showModal = (id: string) => {
        setIsModalVisible(true)
        setSelectedId(id)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    useEffect(() => {
        if (token) {
            dispatch(get(token))
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
                            columns={columns}
                            dataSource={newQuestion}
                            rowKey={'_id'}
                        />
                    )}
                </TabPane>
                <TabPane tab={t('Done')} key="2">
                    {loading ? (
                        <Skeleton active={true} />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={oldQuestion}
                            rowKey={'_id'}
                        />
                    )}
                </TabPane>
            </Tabs>
            <QuestionDetail
                selectedId={selectedId}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default ListQuestion
