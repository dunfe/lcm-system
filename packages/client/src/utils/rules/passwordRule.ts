export const passwordRule = (t) => {
    return [
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (getFieldValue('password') !== value) {
                    return Promise.resolve()
                }
                return Promise.reject(
                    new Error(
                        t('The old and the new password must be not the same!')
                    )
                )
            },
        }),
        {
            required: true,
            message: 'Please input the new password!',
        },
        {
            pattern: new RegExp('(?=.*[a-z])'),
            message: t(
                'The password must contain at least 1 lowercase alphabetical character'
            ),
        },
        {
            pattern: new RegExp('^((?!\\s).)*$'),
            message: t('The password must not contain whitespace'),
        },
        {
            pattern: new RegExp('(?=.*[A-Z])'),
            message: t(
                'The password must contain at least 1 uppercase alphabetical character'
            ),
        },
        {
            pattern: new RegExp('(?=.*[0-9])'),
            message: t(
                'The password must contain at least 1 numeric character'
            ),
        },
        {
            pattern: new RegExp('(?=.*[!@#$%^&*])'),
            message: t(
                'The password must contain at least one special character'
            ),
        },
        {
            pattern: new RegExp('(?=.{8,})'),
            message: t('The password must be eight characters or longer'),
        },
    ]
}
