import { createI18nContext } from '@solid-primitives/i18n'

const dict = {
  en: {
    hey: 'Hey',
    im: "I'm Yanren",
    yanren: 'Yanren',
    nav: {
      home: 'Home',
      friend: 'Friend',
    },
    info: {
      1: 'Front-end & Android developer.',
      2: 'Currently working at Cosmic Star Global Limited.',
      3: 'I like making interesting projects.',
    },
  },
  zhCN: {
    hey: '嗨',
    im: '我是炎忍',
    yanren: '炎忍',
    nav: {
      home: '主页',
      friend: '友链',
    },
    info: {
      1: '前端与安卓开发者。',
      2: '目前在星宇网络有限公司工作。',
      3: '我喜欢做有趣的项目。',
    },
  },
}

const i18nValue = createI18nContext(dict, 'en')

export default i18nValue
