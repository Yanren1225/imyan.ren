import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [basePreset()],
  transformers: [transformerDirectives()],
})
