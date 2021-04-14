import * as React from 'react'
import { Descriptions, Modal, Skeleton } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import CustomFooter from './CustomFooter'

interface IProps {
    selectedId: string
    isModalVisible: boolean
    handleCancel: () => void
}

interface IQuestion {
    receivedBy: string[]
    point: number
    skill: string[]
    timeAvailableFrom: number
    timeAvailableTo: number
    status: string
    _id: string
    title: string
    menteeId: string
    menteeName: string
    content: string
    createAt: string
    __v: number
}

const { useState, useEffect } = React
const QuestionDetail = (props: IProps) => {
    const { selectedId, isModalVisible, handleCancel } = props
    const instance = useAPI()
    const { t } = useTranslation()

    const [question, setQuestion] = useState<IQuestion>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedId !== '') {
            setLoading(true)
            instance
                .get(`api/users/questions/${selectedId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setQuestion(response.data.data)
                    }
                    setLoading(false)
                })
                .catch((error) => console.error(error))
        }
    }, [selectedId])
    return (
        <Modal
            style={{ minWidth: 600 }}
            title={question?.title}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={
                <CustomFooter
                    selectedId={selectedId}
                    handleCancel={handleCancel}
                />
            }
        >
            {loading ? (
                <Skeleton active />
            ) : (
                <Descriptions
                    key={question?._id}
                    className={'matching-description'}
                    bordered
                >
                    <Descriptions.Item label={t('Mentee')} span={3}>
                        {question?.menteeName}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Point')} span={3}>
                        {question?.point}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Skill')} span={3}>
                        {question?.skill.join(',')}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Status')}>
                        {question?.status}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('From')} span={2}>
                        {dayjs(question?.createAt).format('LLLL')}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Content')}>
                        {question?.content}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    )
}

export default QuestionDetail
