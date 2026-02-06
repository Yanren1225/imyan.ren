<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { GeekCursor } from '@yanren/common'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<GeekCursor />

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
  <main>
    {@render children()}
  </main>
</div>
