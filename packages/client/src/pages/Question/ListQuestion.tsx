import * as React from 'react'
import { Tabs, Table, Skeleton, Space, Modal } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'
import QuestionDetail from '../../components/Question/QuestionDetail'
import { useTranslation } from 'react-i18next'

export interface IData {
    receivedBy: string[]
    point: number
    skill: string[]
    time: number
    status: string
    _id: string
    title: string
    menteeId: string
    menteeName: string
    content: string
    note: string
    createAt: string
    __v: number
}
const { TabPane } = Tabs

const { useEffect, useState } = React

const ListQuestion = () => {
    const instance = useAPI()
    const { t } = useTranslation()

    const [newQuestion, setNewQuestion] = useState<IData[]>([])
    const [oldQuestion, setOldQuestion] = useState<IData[]>([])
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
            render(): JSX.Element {
                return (
                    <Space size="middle">
                        <a onClick={() => showEdit()}>{t('Edit')}</a>
                        <a>{t('Delete')}</a>
                    </Space>
                )
            },
        },
    ]

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
        const loadData = async () => {
            await instance
                .get('/api/users/questions/done')
                .then((response) => {
                    if (response.status === 200) {
                        setOldQuestion(response.data.data.results)
                    }
                })
                .catch((error) => console.error(error.message))

            await instance
                .get('/api/users/questions/new')
                .then((response) => {
                    if (response.status === 200) {
                        setNewQuestion(response.data.data.results)
                    }
                })
                .catch((error) => console.error(error.message))
        }

        loadData().then(() => setLoading(false))
    }, [isModalVisible])

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
