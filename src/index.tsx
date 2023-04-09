/* @refresh reload */
import './index.less'
import 'virtual:uno.css'

import { I18nContext } from '@solid-primitives/i18n'
import { render } from 'solid-js/web'

import App from './App'
import i18nValue from './locales'

render(
  () => (
    <I18nContext.Provider value={i18nValue}>
      <App />
    </I18nContext.Provider>
  ),
  document.getElementById('root') as HTMLElement
)
