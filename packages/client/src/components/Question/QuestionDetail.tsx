import * as React from 'react'
import { Modal } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'

interface IProps {
    selectedId: string
    isModalVisible: boolean
    handleOk: (state: any) => void
    handleCancel: (state: any) => void
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
    const { selectedId, isModalVisible, handleCancel, handleOk } = props
    const instance = useAPI()

    const [question, setQuestion] = useState<IQuestion>()

    useEffect(() => {
        if (selectedId !== '') {
            instance
                .get(`api/users/questions/${selectedId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setQuestion(response.data.data)
                    }
                })
                .catch((error) => console.error(error))
        }
    })
    return (
        <Modal
            title={question?.title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default QuestionDetail
