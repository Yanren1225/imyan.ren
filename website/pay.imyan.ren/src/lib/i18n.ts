import { createI18n } from '@yanren/i18n'
import { dict as en } from './locales/en'
import { dict as zhCn } from './locales/zh-cn'

const translations = {
  en,
  'zh-cn': zhCn,
}

export const i18n = createI18n(translations, 'en')

export type Locale = typeof i18n.locale
