import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  safelist: ['i-ri-alipay-fill', 'i-ri-wechat-fill', 'i-ri-qq-fill'],
  presets: [basePreset()],
})
