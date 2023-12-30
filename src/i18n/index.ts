import * as i18n from '@solid-primitives/i18n'
import { createMemo, createSignal } from 'solid-js'

import en from './locale/en'
import zhCN from './locale/zh-cn'

type Locale = 'zh-cn' | 'en'

const dictionaries = {
  en: en,
  'zh-cn': zhCN,
}

const [locale, setLocale] = createSignal<Locale>('en')
const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))
// eslint-disable-next-line solid/reactivity
const t = i18n.translator(dict)

export { locale, setLocale, t }
export type { Locale }
