import './footer.less'

import { Component } from 'solid-js'

import { t } from '@/i18n'

const Footer: Component = () => {
  return (
    <footer>
      <p>{t('yanren')} © 2023</p>
    </footer>
  )
}

export { Footer }
