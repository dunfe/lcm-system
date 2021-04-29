import { useAPI } from '../../utils/hooks/useAPI'
import * as React from 'react'
import { Button, message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { DeleteOutlined } from '@ant-design/icons'

interface IProps {
    mode: string
    setMode: (state: string) => void
    selectedId: string
    handleCancel: () => void
}

const { confirm } = Modal

const CustomFooter = (props: IProps) => {
    const { selectedId, handleCancel, setMode, mode } = props
    const { t } = useTranslation()
    const instance = useAPI()

    const onEdit = () => {
        setMode('edit')
    }

    const onDelete = () => {
        confirm({
            title: t('Are you sure delete this question?'),
            icon: <DeleteOutlined />,
            okText: t('Yes'),
            okType: 'danger',
            cancelText: t('No'),
            onOk() {
                instance
                    .delete(`/api/users/questions/${selectedId}`)
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

    const onBack = () => {
        setMode('detail')
    }

    return (
        <>
            {mode === 'detail' ? (
                <>
                    <Button key="delete" onClick={onDelete}>
                        {t('Delete')}
                    </Button>
                    <Button key="submit" type="primary" onClick={onEdit}>
                        {t('Edit')}
                    </Button>
                </>
            ) : (
                <Button key="back" onClick={onBack}>
                    {t('Back')}
                </Button>
            )}
        </>
    )
}

export default CustomFooter
