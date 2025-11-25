import './language-switcher.css'

import { Component, createEffect, For } from 'solid-js'

import { Locale, locale, setLocale } from '@/i18n'

const LanguageSwitcher: Component = () => {
  const languageList: { text: string; lan: Locale }[] = [
    {
      text: 'EN',
      lan: 'en',
    },
    {
      text: '简',
      lan: 'zh-cn',
    },
  ]

  createEffect(() => {
    if (locale() === 'en') {
      document.title = "I'm Yanren"
    } else {
      document.title = '我是炎忍'
    }
  })

  return (
    <div id="language-switcher">
      <ul class="language-list">
        <For each={languageList}>
          {(item) => {
            return (
              <li>
                <p
                  classList={{ active: locale() === item.lan }}
                  onClick={() => setLocale(item.lan)}
                  class="outfit"
                >
                  {item.text}
                </p>
              </li>
            )
          }}
        </For>
      </ul>
    </div>
  )
}

export { LanguageSwitcher }
