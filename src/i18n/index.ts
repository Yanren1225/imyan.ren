import * as i18n from '@solid-primitives/i18n'
import { createMemo, createSignal } from 'solid-js'

import * as en from './locale/en'
import * as zhCN from './locale/zh-cn'

type Locale = 'zh-cn' | 'en'

const dictionaries = {
  en: en.default,
  'zh-cn': zhCN.default,
}

const [locale, setLocale] = createSignal<Locale>('en')
const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))
// eslint-disable-next-line solid/reactivity
const t = i18n.translator(dict)

export { locale, setLocale, t }
export type { Locale }
