import * as React from 'react'

import CustomFooter from './CustomFooter'
import { useAPI } from '../../utils/hooks/useAPI'
import AddQuestion from '../../pages/Add/AddQuestion'
import { Descriptions, Modal, Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Preview } from 'common'

interface IProps {
    mode: string
    setMode: (state: string) => void
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
    const { selectedId, isModalVisible, handleCancel, mode, setMode } = props
    const instance = useAPI()
    const { t } = useTranslation()

    const [question, setQuestion] = useState<IQuestion>()
    const [loading, setLoading] = useState(false)

    const content = () => {
        if (mode === 'detail') {
            return (
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
                        <Preview content={question?.content!} />
                    </Descriptions.Item>
                </Descriptions>
            )
        } else {
            return (
                <AddQuestion
                    mode={'update'}
                    selectedId={selectedId}
                    setMode={setMode}
                    reloadQuestion={setQuestion}
                />
            )
        }
    }

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
            style={{ minWidth: 700 }}
            title={question?.title}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={
                question?.status === 'new' ? (
                    <CustomFooter
                        mode={mode}
                        setMode={setMode}
                        selectedId={selectedId}
                        handleCancel={handleCancel}
                    />
                ) : null
            }
        >
            {loading ? <Skeleton active /> : content()}
        </Modal>
    )
}

export default QuestionDetail
