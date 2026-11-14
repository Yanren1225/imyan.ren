<script lang="ts">
  import 'virtual:uno.css'
  import '../app.css'
  import { GeekCursor, Footer, LanguageSwitcher, SiteHead } from '@yanren/common'
  import { i18n, type Locale } from '$lib/i18n'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()

  const languages: { text: string; locale: Locale }[] = [
    { text: 'en_US', locale: 'en' },
    { text: 'zh_CN', locale: 'zh-cn' },
  ]

  const formatText = (text: string, isActive: boolean) => {
    return isActive ? `[ ${text} ]` : text
  }
</script>

<SiteHead
  description="Yanren 的个人笔记：技术、折腾与生活记录。"
  {favicon}
/>

<GeekCursor />

<div class="app-layout">
  <div class="lang-switch-wrapper mb-4">
    <LanguageSwitcher {i18n} {languages} {formatText} />
  </div>

  <main>
    {@render children()}
  </main>

  <Footer
    author="Yanren"
    hasTravelling={false}
    showThemeSwitcher
    themeLabels={{
      auto: i18n.t.themeAuto,
      light: i18n.t.themeLight,
      dark: i18n.t.themeDark,
      change: i18n.t.changeTheme,
    }}
  />
</div>
