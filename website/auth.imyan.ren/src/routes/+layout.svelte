<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { page } from '$app/state'
  import { GeekCursor, SiteHead, ThemeSwitcher } from '@yanren/common'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<SiteHead
  title={page.url.pathname === '/error'
    ? 'Access Denied - Yanren'
    : 'System Access - Yanren'}
  description="Yanren 统一认证入口。"
  {favicon}
/>

<GeekCursor />

<div class="theme-switcher-wrapper">
  <ThemeSwitcher />
</div>

<div class="app-layout">
  <main>
    {@render children()}
  </main>
</div>

<style>
  .theme-switcher-wrapper {
    position: fixed;
    top: max(0.75rem, env(safe-area-inset-top));
    right: 1rem;
    z-index: 10;
  }
</style>
