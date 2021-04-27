import { useTranslation } from 'react-i18next'

const useUsernameRule = () => {
    const { t } = useTranslation()

    return [
        {
            pattern: new RegExp('(?=.{8,20}$)'),
            message: t('Username must be between 8 and 20 character'),
        },
        {
            pattern: new RegExp(
                '^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
            ),
            message: t('Only use character or number in your username'),
        },
    ]
}

export default useUsernameRule
