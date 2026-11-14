<script lang="ts">
  import 'virtual:uno.css'
  import '../index.css'

  import { page } from '$app/state'
  import { i18n } from '$lib/i18n'
  import favicon from '$assets/favicon.svg'

  import Header from '$lib/components/header/header.svelte'
  import PageTransition from '$lib/components/page-transition/page-transition.svelte'
  import { Footer, GeekCursor, GeekDecorations, SiteHead } from '@yanren/common'

  let { children } = $props()
</script>

<SiteHead
  title={i18n.locale === 'zh-cn' ? '我是炎忍' : "I'm Yanren"}
  description="nice -20 Game && nice 19 Code"
  {favicon}
  canonical="https://imyan.ren/"
  ogImage="https://github.com/yanren1225.png"
  ogSiteName="imyan.ren"
  ogLocale="zh_CN"
  themeColor="#ff6b81"
  themeColorDark="#872e4e"
/>

<GeekCursor />
<GeekDecorations />

<div class="app-layout">
  <Header />

  <main>
    {#key page.url.pathname}
      <PageTransition>
        {@render children()}
      </PageTransition>
    {/key}
  </main>

  <Footer
    author={i18n.t.yanren}
    hasTravelling
    showThemeSwitcher
    themeLabels={{
      auto: i18n.t.themeAuto,
      light: i18n.t.themeLight,
      dark: i18n.t.themeDark,
      change: i18n.t.changeTheme,
    }}
  />
</div>
