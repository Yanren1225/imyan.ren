import './header.less'

import { A, useMatch } from '@solidjs/router'
import { Component } from 'solid-js'

import { t } from '@/i18n'

import { LanguageSwitcher } from '../language-swicher'

const Header: Component = () => {
  return (
    <>
      <header>
        <ul class="nav">
          <li>
            <A classList={{ active: Boolean(useMatch(() => '/')()) }} href="/">
              {t('nav.home')}
            </A>
          </li>
          <li>
            <A
              classList={{ active: Boolean(useMatch(() => '/friend')()) }}
              href="/friend"
            >
              {t('nav.friend')}
            </A>
          </li>
          <li>
            <A
              classList={{ active: Boolean(useMatch(() => '/comment')()) }}
              href="/comment"
            >
              {t('nav.comment')}
            </A>
          </li>
          <li>
            <A target="_blank" href="https://www.travellings.cn/go.html">
              {t('nav.travelling')}
            </A>
          </li>
        </ul>
        <LanguageSwitcher />
      </header>
    </>
  )
}

export { Header }
