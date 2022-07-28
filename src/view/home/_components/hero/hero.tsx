import style from './hero.module.css'
import { useI18n } from '@solid-primitives/i18n'

const Hero = () => {
  const [t] = useI18n()

  return (
    <div class="outfit" id={style.hero}>
      <h1>
        <span class={`${style.block}`}>{t('hey')},</span>
        <span class={style.block}>{t('im')}</span>
      </h1>
      <div class={style.info}>
        <p>{t('info.1')}</p>
        <p>{t('info.2')}</p>
        <p>{t('info.3')}</p>
      </div>
    </div>
  )
}

export { Hero }
