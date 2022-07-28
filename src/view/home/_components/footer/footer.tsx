import style from './footer.module.css'
import { useI18n } from '@solid-primitives/i18n'

const Footer = () => {
  const [t] = useI18n()

  return (
    <footer style={style.footer}>
      <p>{t('yanren')} © 2022</p>
    </footer>
  )
}

export { Footer }
