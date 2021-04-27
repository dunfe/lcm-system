import { useTranslation } from 'react-i18next'

const useTrans = () => {
    const { t } = useTranslation()

    return t
}

export default useTrans
