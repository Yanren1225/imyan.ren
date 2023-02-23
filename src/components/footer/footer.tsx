import './footer.less'
import { useI18n } from '@solid-primitives/i18n'
import { Component } from 'solid-js'

const Footer: Component = () => {
  const [t] = useI18n()

  return (
    <footer>
      <p>{t('yanren')} © 2023</p>
    </footer>
  )
}

export { Footer }
