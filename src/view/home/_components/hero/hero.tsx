import style from './hero.module.css'
import { useI18n } from '@solid-primitives/i18n'

const Hero = () => {
  const [t] = useI18n()

  return (
    <div class="outfit" id={style.hero}>
      <div class={style.box}>
        <p>
          {t('hey')},<br />
          {t('im')}
        </p>
      </div>
      <div class={style.info}>
        <p>{t('info.1')}</p>
        <p>{t('info.2')}</p>
        <p>{t('info.3')}</p>
      </div>
    </div>
  )
}

export { Hero }
