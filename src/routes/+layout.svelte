<script lang="ts">
  import 'virtual:uno.css'
  import '../index.css'

  import { page } from '$app/state'

  import Header from '$lib/components/header/header.svelte'
  import Footer from '$lib/components/footer/footer.svelte'
  import GeekCursor from '$lib/components/geek-cursor/geek-cursor.svelte'
  import GeekDecorations from '$lib/components/geek-decorations/geek-decorations.svelte'
  import PageTransition from '$lib/components/page-transition/page-transition.svelte'

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

  <Footer />
</div>
