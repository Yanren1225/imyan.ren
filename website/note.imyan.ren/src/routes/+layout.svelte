<script lang="ts">
  import 'virtual:uno.css'
  import favicon from '$lib/assets/favicon.svg'
  import '../app.css'
  import { GeekCursor, Footer, LanguageSwitcher } from '@yanren/common'
  import { i18n, type Locale } from '$lib/i18n'

  let { children } = $props()

  const languages: { text: string; locale: Locale }[] = [
    { text: 'en_US', locale: 'en' },
    { text: 'zh_CN', locale: 'zh' },
  ]

  const formatText = (text: string, isActive: boolean) => {
    return isActive ? `[ ${text} ]` : text
  }
</script>

<GeekCursor />

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
  <div class="lang-switch-wrapper mb-4">
    <LanguageSwitcher {i18n} {languages} {formatText} />
  </div>

  <main>
    {@render children()}
  </main>

  <Footer author="Yanren" hasTravelling={false} />
</div>
