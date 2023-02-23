import { useI18n } from '@solid-primitives/i18n'
import './header.less'
import { Link } from '@solidjs/router'
import { LanguageSwitcher } from '../language-swicher'
import { Component } from 'solid-js'

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
