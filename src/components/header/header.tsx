import './header.css'

import { A, useMatch } from '@solidjs/router'
import { Component, createSignal, onMount, onCleanup } from 'solid-js'

import { t } from '@/i18n'

import { LanguageSwitcher } from '../language-switcher'

export const Header: Component = () => {
  const [isScrolled, setIsScrolled] = createSignal(false)

  onMount(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    onCleanup(() => window.removeEventListener('scroll', handleScroll))
  })

  return (
    <>
      <header classList={{ scrolled: isScrolled() }}>
        <ul class="nav font-mono">
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
              classList={{ active: Boolean(useMatch(() => '/about')()) }}
              href="/about"
            >
              {t('nav.about')}
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
