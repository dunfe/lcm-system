import vi from './vi/translation.json'
import en from './en/translation.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const resources = {
    vi: {
        translation: vi,
    },
    en: {
        translation: en,
    },
} as const

i18n.use(LanguageDetector).use(initReactI18next).init({
    lng: 'vi',
    debug: true,
    resources,
})
