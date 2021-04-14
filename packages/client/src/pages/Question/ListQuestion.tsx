import * as React from 'react'
import { Tabs, Table } from 'antd'
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
    ]

    const showModal = (id: string) => {
        setIsModalVisible(true)
        setSelectedId(id)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    useEffect(() => {
        instance
            .get('/api/users/questions/done')
            .then((response) => {
                if (response.status === 200) {
                    setOldQuestion(response.data.data.results)
                }
            })
            .catch((error) => console.error(error.message))

        instance
            .get('/api/users/questions/new')
            .then((response) => {
                if (response.status === 200) {
                    setNewQuestion(response.data.data.results)
                }
            })
            .catch((error) => console.error(error.message))
    }, [])

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab={'New'} key="1">
                    <Table
                        columns={columns}
                        dataSource={newQuestion}
                        rowKey={'_id'}
                    />
                </TabPane>
                <TabPane tab={t('Done')} key="2">
                    <Table
                        columns={columns}
                        dataSource={oldQuestion}
                        rowKey={'_id'}
                    />
                </TabPane>
            </Tabs>
            <QuestionDetail
                selectedId={selectedId}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
        </>
    )
}

export default ListQuestion
