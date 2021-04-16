export const passwordRule = (t) => {
    return [
        {
            required: true,
            message: 'Please input the new password!',
        },
        {
            pattern: new RegExp('(?=.*[a-z])'),
            message: t(
                'The string must contain at least 1 lowercase alphabetical character'
            ),
        },
        {
            pattern: new RegExp('(?=.*[A-Z])'),
            message: t(
                'The string must contain at least 1 uppercase alphabetical character'
            ),
        },
        {
            pattern: new RegExp('(?=.*[0-9])'),
            message: t('The string must contain at least 1 numeric character'),
        },
        {
            pattern: new RegExp('(?=.*[!@#$%^&*])'),
            message: t(
                'The string must contain at least one special character'
            ),
        },
        {
            pattern: new RegExp('(?=.{8,})'),
            message: t('The string must be eight characters or longer'),
        },
    ]
}
