import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'antd/es/select'
import message from 'antd/es/message'
import 'antd/es/config-provider/index'

const { Option } = Select

const SelectLocale = () => {
    const {t, i18n} = useTranslation()

    const onLocaleChange = (value: string) => {
        i18n.changeLanguage(value).then(() => {
            message.success(t(`Changed language to`) + t(`${value}`))
        })
    }

    return (
        <Select
            defaultValue="vi"
            size={'small'}
            onChange={onLocaleChange}
        >
            <Option value="vi">VI</Option>
            <Option value="en">EN</Option>
        </Select>
    )
}

export default SelectLocale