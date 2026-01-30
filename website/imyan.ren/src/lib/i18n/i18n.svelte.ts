import { createI18n } from '@yanren/i18n'
import en from './locale/en'
import zhCN from './locale/zh-cn'

const dictionaries = {
  en,
  'zh-cn': zhCN,
}

export const i18n = createI18n(dictionaries, 'en')

export type Locale = keyof typeof dictionaries
