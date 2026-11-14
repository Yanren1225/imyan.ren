<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { Footer, GeekCursor, SiteHead } from '@yanren/common'
  import { i18n } from '$lib/i18n'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<SiteHead
  title="Pay --user Yanren"
  description="支持炎忍：支付宝、微信或 QQ 钱包。"
  {favicon}
/>

<GeekCursor />

<div class="app-layout">
  <main>
    {@render children()}
  </main>

  <Footer
    author={i18n.t.yanren}
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
