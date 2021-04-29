import { useAPI } from '../../utils/hooks/useAPI'
import * as React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const { confirm } = Modal

interface IProps {
    id: string
    handleCancel: () => void
}
const DeleteQuestion = (props: IProps) => {
    const { id, handleCancel } = props
    const { t } = useTranslation()
    const instance = useAPI()

    return confirm({
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

export default DeleteQuestion
