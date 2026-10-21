import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  presets: [basePreset()],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
      sans: ['Rubik', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
})
