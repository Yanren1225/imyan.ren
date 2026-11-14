<script lang="ts">
  import { LanguageSwitcher } from '@yanren/common'
  import { i18n, type Locale } from '$lib/i18n'

  const languages: { text: string; locale: Locale }[] = [
    { text: 'en_US', locale: 'en' },
    { text: 'zh_CN', locale: 'zh-cn' },
  ]

  const formatText = (text: string, isActive: boolean) => {
    return isActive ? `[ ${text} ]` : text
  }
</script>

<LanguageSwitcher
  {i18n}
  {languages}
  {formatText}
  class="imyan-lang-switcher"
/>

<style>
  :global(.imyan-lang-switcher .lang-btn) {
    font-family: 'Fira Code', monospace;
  }
</style>
