import en from './locale/en'
import zhCN from './locale/zh-cn'

export type Translation = typeof zhCN

const dictionaries = {
  en: en,
  'zh-cn': zhCN,
}

export type Locale = keyof typeof dictionaries

let locale = $state<Locale>('en')

export const i18n = {
  get locale() {
    return locale
  },
  setLocale(l: Locale) {
    locale = l
  },

  get t() {
    return dictionaries[locale]
  },
}
