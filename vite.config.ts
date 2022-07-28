import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import postCssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  css: {
    postcss: {
      plugins: [postCssPresetEnv({ stage: 0 })],
    },
  },
})
