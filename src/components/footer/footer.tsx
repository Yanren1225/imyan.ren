import './footer.less'

import { t } from '@/i18n'
import { Component } from 'solid-js'

const Footer: Component = () => {
  return (
    <footer>
      <p>{t('yanren')} © 2023</p>
    </footer>
  )
}

export { Footer }
