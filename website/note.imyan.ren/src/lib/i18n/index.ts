import { createI18n } from '@yanren/i18n'
import { en, zh } from './locales'

const dictionaries = {
  en,
  zh,
}

export const i18n = createI18n(dictionaries, 'en')

export type Locale = keyof typeof dictionaries
