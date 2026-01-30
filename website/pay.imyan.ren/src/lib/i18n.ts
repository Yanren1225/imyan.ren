import { createI18n } from '@yanren/i18n'
import { dict as en } from './locales/en'
import { dict as zhCn } from './locales/zh-cn'

const translations = {
  en,
  'zh-cn': zhCn,
}

export const i18n = createI18n(translations, 'en')

export type Locale = typeof i18n.locale

// Adapter to maintain some compatibility if needed, but better to update components to use i18n.t and i18n.locale directly.
// The previous implementation used stores: useI18n() -> { locale: store, t: derived }
// The new one is global state object: i18n.locale (getter), i18n.t (getter).
