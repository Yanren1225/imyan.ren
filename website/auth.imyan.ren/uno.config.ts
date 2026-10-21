import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [basePreset()],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
      sans: ['Rubik', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
})
