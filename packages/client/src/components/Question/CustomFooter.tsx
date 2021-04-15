import * as React from 'react'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAPI } from '../../utils/hooks/useAPI'

interface IProps {
    mode: string
    setMode: (state: string) => void
    selectedId: string
    handleCancel: () => void
}

const CustomFooter = (props: IProps) => {
    const { selectedId, handleCancel, setMode, mode } = props
    const { t } = useTranslation()
    const instance = useAPI()

    const onDelete = () => {
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
    }

    const onEdit = () => {
        setMode('edit')
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
