import './footer.less'
import { useI18n } from '@solid-primitives/i18n'

const Footer = () => {
  const [t] = useI18n()

  return (
    <footer>
      <p>{t('yanren')} © 2023</p>
    </footer>
  )
}

export { Footer }
