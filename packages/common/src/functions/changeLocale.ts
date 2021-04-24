import i18n from 'i18next'


const changeLocale = (value: 'VI' | 'EN') => {
    i18n.changeLanguage(value).then(() => {
        console.log('Changed locale to' + value)
    })
}

export default changeLocale