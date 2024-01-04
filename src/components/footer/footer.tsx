import './footer.less'

import { Component } from 'solid-js'

import { t } from '@/i18n'

const Footer: Component = () => {
  return (
    <footer>
      <p>{t('yanren')} © 2024</p>
    </footer>
  )
}

export { Footer }
