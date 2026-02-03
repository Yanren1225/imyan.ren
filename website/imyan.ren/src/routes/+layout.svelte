<script lang="ts">
  import 'virtual:uno.css'
  import '../index.css'

  import { page } from '$app/state'
  import { i18n } from '$lib/i18n'

  import Header from '$lib/components/header/header.svelte'
  import PageTransition from '$lib/components/page-transition/page-transition.svelte'
  import { Footer, GeekCursor, GeekDecorations } from '@yanren/common'
  // import GeekDecorations from '$lib/components/geek-decorations/geek-decorations.svelte'

  let { children } = $props()
</script>

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

  <Footer author={i18n.t.yanren} hasTravelling />
</div>
