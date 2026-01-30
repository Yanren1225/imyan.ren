import presetSodesu from 'sodesu-comment/preset'
import safeList from 'sodesu-comment/safeList'
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
    presetSodesu(),
  ],
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
