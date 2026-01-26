import path from 'path'
import postCssPresetEnv from 'postcss-preset-env'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [UnoCSS(), solidPlugin()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('vue') || id.includes('waline')) {
            return 'waline'
          }
        },
      },
    },
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
