import { defineConfig, presetWebFonts } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  presets: [
    basePreset(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Rubik', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    }),
  ],
})
