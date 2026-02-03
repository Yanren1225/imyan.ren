<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { Footer, GeekCursor } from '@yanren/common'
  import { i18n } from '$lib/i18n'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href="https://github.com/yanren1225.png" />
</svelte:head>

<GeekCursor />

<div class="app-layout">
  <main>
    {@render children()}
  </main>

  <Footer author={i18n.t.yanren} hasTravelling={false} />
</div>
