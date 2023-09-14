/* @refresh reload */
import './index.less'
import 'virtual:uno.css'

import { render } from 'solid-js/web'

import App from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
