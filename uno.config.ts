import presetSodesu from 'sodesu-comment/preset'
import safeList from 'sodesu-comment/safeList'
import {
  defineConfig,
  presetIcons,
  presetMini,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetMini({
      dark: 'media',
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Rubik', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
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
