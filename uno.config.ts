import presetSodesu from 'sodesu-comment/dist/preset'
import safeList from 'sodesu-comment/dist/safeList'
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
})
