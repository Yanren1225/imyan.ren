import type * as en from './en'
import * as i18n from '@solid-primitives/i18n'
import { createResource, createSignal } from 'solid-js'

type Locale = 'zh-cn' | 'en'

type RawDictionary = typeof en.dict
type Dictionary = i18n.Flatten<RawDictionary>

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  // await new Promise((r) => setTimeout(r, 600))

  const dict: RawDictionary = (
    await import(/* @vite-ignore */ `./${locale}.ts`)
  ).dict
  return i18n.flatten(dict)
}

const [locale, setLocale] = createSignal<Locale>('en')
const [dict] = createResource(locale, fetchDictionary)
const t = i18n.translator(dict, i18n.resolveTemplate)

export { locale, setLocale, t }
export type { Locale }
