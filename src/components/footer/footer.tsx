import './footer.less'

import { Component } from 'solid-js'

import { t } from '@/i18n'

const Footer: Component = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>
        © 2018 - {currentYear} {t('yanren')}
      </p>
    </footer>
  )
}

export { Footer }
