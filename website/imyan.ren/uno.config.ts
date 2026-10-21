import presetSodesu from 'sodesu-comment/preset'
import safeList from 'sodesu-comment/safeList'
import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  presets: [basePreset(), presetSodesu()],
  safelist: safeList,
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
      sans: ['Rubik', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    breakpoints: {
      sm: '600px',
      md: '768px',
      lg: '1000px',
      xl: '1280px',
    },
  },
})
