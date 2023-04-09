import './header.less'

import { useI18n } from '@solid-primitives/i18n'
import { Link } from '@solidjs/router'
import { Component } from 'solid-js'

import { LanguageSwitcher } from '../language-swicher'

const Header: Component = () => {
  const [t] = useI18n()

  return (
    <>
      <header>
        <ul class="nav">
          <li>
            <Link href="/">{t('nav.home')}</Link>
          </li>
          <li>
            <Link href="/firend">{t('nav.friend')}</Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </header>
    </>
  )
}

export { Header }
