import './language-swicher.pcss'
import { useI18n } from '@solid-primitives/i18n'
import { Component, createEffect, For } from 'solid-js'

const LanguageSwitcher: Component = () => {
  const languageList = [
    {
      text: 'EN',
      lan: 'en',
    },
    {
      text: '简',
      lan: 'zhCN',
    },
  ]

  const [, { locale }] = useI18n()

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
                  onClick={() => locale(item.lan)}
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
