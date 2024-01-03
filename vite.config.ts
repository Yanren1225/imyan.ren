import path from 'path'
import postCssPresetEnv from 'postcss-preset-env'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS()],
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
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
})
