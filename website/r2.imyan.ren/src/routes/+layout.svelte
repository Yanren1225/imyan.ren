<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { GeekCursor, Footer, Toaster, ModalContainer, SiteHead } from '@yanren/common'

  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<SiteHead
  title="R2 Dashboard - Yanren"
  description="Yanren 的 R2 文件管理。"
  {favicon}
/>

<GeekCursor />
<Toaster />
<ModalContainer />

<div class="app-layout">
  <main>
    {@render children()}
  </main>

  <Footer author="Yanren" hasTravelling={false} showThemeSwitcher />
</div>
