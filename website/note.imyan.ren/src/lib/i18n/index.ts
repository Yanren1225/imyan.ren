import { createI18n } from '@yanren/i18n'
import { en, zh } from './locales'

export const i18n = createI18n(
  {
    en,
    zh,
  },
  'en',
)

export type Locale = keyof typeof i18n.locale
