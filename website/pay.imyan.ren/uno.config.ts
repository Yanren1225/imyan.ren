import { defineConfig, presetWebFonts } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  presets: [
    basePreset(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        Outfit: 'Outfit',
        Satoshi: 'Satoshi',
      },
    }),
  ],
})
