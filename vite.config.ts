import { defineConfig } from 'vite'
import path from 'path'
import solidPlugin from 'vite-plugin-solid'
import postCssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [postCssPresetEnv({ stage: 0 })],
    },
  },
})
