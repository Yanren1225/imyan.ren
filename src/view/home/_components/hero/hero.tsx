import './hero.css'

import { Component } from 'solid-js'

import { locale, t } from '@/i18n'

export const Hero: Component = () => {
  return (
    <div class="outfit" id="hero">
      <div class="box">
        <p>
          {t('hey')},<br />
          {t('im')}
          {locale() === 'en' ? ' ' : ''}
          <span class="font-bold">{t('yanren')}</span>.
        </p>
      </div>
      <div class="info">
        <p>{t('info.0')}</p>
        <p>{t('info.1')}</p>
      </div>
    </div>
  )
}
