import * as React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

interface IProps {
    endMode: string
    handleOk: () => void
}

const EndSessionFooter = (props: IProps) => {
    const { handleOk, endMode } = props
    const { t } = useTranslation()
    return (
        <>
            {endMode === 'rate' ? (
                <Button danger onClick={handleOk}>
                    {t('Report this mentor')}
                </Button>
            ) : null}
            <Button type={'primary'} onClick={handleOk}>
                {endMode === 'rate' ? t('Done') : t('Back')}
            </Button>
        </>
    )
}

export default EndSessionFooter
