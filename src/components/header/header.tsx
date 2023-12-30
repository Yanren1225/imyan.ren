import './header.less'

import { Link, useMatch } from '@solidjs/router'
import { Component } from 'solid-js'

import { t } from '@/i18n'

import { LanguageSwitcher } from '../language-swicher'

const Header: Component = () => {
  return (
    <>
      <header>
        <ul class="nav">
          <li>
            <Link
              classList={{ active: Boolean(useMatch(() => '/')()) }}
              href="/"
            >
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link
              classList={{ active: Boolean(useMatch(() => '/firend')()) }}
              href="/firend"
            >
              {t('nav.friend')}
            </Link>
          </li>
          <li>
            <Link
              classList={{ active: Boolean(useMatch(() => '/comment')()) }}
              href="/comment"
            >
              {t('nav.comment')}
            </Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </header>
    </>
  )
}

export { Header }
