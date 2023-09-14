import './hero.less'

import { t } from '@/i18n'
import { Component } from 'solid-js'

const Hero: Component = () => {
  return (
    <div class="outfit" id="hero">
      <div class="box">
        <p>
          {t('hey')},<br />
          {t('im')}
        </p>
      </div>
      <div class="info">
        <p>{t('info.1')}</p>
        <p>{t('info.2')}</p>
        <p>{t('info.3')}</p>
      </div>
    </div>
  )
}

export { Hero }
