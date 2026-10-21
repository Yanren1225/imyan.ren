import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  safelist: ['i-ri-alipay-fill', 'i-ri-wechat-fill', 'i-ri-qq-fill'],
  presets: [basePreset()],
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
