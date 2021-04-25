import { useTranslation } from 'react-i18next'

const useFullnameRule = () => {
    const { t } = useTranslation()

    return [
        {
            required: true,
            message: t('Please enter your full name'),
        },
        {
            pattern: new RegExp(
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +\n' +
                    '            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +\n' +
                    '            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\\\s]+$'
            ),
            message: t('Please input exactly your full name'),
        },
    ]
}

export default useFullnameRule
