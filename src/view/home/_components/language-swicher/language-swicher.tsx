import './language-swicher.postcss'
import { useI18n } from '@solid-primitives/i18n'
import { createEffect } from 'solid-js'

const LanguageSwitcher = () => {
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

  const [_, { locale }] = useI18n()

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
        {languageList.map((item) => {
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
        })}
      </ul>
    </div>
  )
}

export { LanguageSwitcher }
