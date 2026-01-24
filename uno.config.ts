import presetSodesu from 'sodesu-comment/preset'
import safeList from 'sodesu-comment/safeList'
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        Outfit: 'Outfit',
        Satoshi: 'Satoshi',
        mono: 'Fira Code',
      },
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '24px',
        height: '24px',
      },
    }),
    presetSodesu(),
  ],
  transformers: [transformerDirectives()],
  safelist: safeList,
  theme: {
    breakpoints: {
      sm: '600px',
      md: '768px',
      lg: '1000px',
      xl: '1280px',
    },
  },
})
