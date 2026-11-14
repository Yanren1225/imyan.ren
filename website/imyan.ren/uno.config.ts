import presetSodesu from 'sodesu-comment/preset'
import safeList from 'sodesu-comment/safeList'
import { defineConfig } from 'unocss'
import { basePreset } from '@yanren/config'

export default defineConfig({
  presets: [basePreset(), presetSodesu()],
  safelist: safeList,
})
