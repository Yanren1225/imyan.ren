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

  const handleLocaleChange = (locale: Locale) => {
    if (locale === 'en') {
      document.title = "I'm Yanren"
    } else {
      document.title = '我是炎忍'
    }
  }

  // Set initial title
  $effect(() => {
    if (i18n.locale === 'en') {
      document.title = "I'm Yanren"
    } else {
      document.title = '我是炎忍'
    }
  })
</script>

<LanguageSwitcher
  {i18n}
  {languages}
  {formatText}
  onLocaleChange={handleLocaleChange}
  class="imyan-lang-switcher"
/>

<style>
  :global(.imyan-lang-switcher .lang-btn) {
    font-family: 'Fira Code', monospace;
  }
</style>
