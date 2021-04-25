import { useTranslation } from 'react-i18next'

const usePhoneNumberRule = () => {
    const {t} = useTranslation()

    return [
        {
            pattern: new RegExp(
                '(9|1[2|6|8|9])+([0-9]{8})\\b'
            ),
            message: t('Please enter a valid phone number'),
        },
    ]
}

export default usePhoneNumberRule
