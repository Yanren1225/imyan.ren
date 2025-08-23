import './footer.less'

import { Component } from 'solid-js'

import { t } from '@/i18n'

const Footer: Component = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>
        © 2018 - {currentYear} {t('yanren')}{' '}
      </p>
      <a
        href="https://www.travellings.cn/go.html"
        target="_blank"
        rel="noopener"
        title="开往-友链接力"
      >
        <img
          src="https://www.travellings.cn/assets/w.png"
          alt="开往-友链接力"
          width="100"
        />
      </a>
    </footer>
  )
}

export { Footer }
