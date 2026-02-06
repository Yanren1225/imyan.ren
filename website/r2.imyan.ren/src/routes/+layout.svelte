<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { GeekCursor, Footer, Toaster, ModalContainer } from '@yanren/common'

  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<GeekCursor />
<Toaster />
<ModalContainer />

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
  <main>
    {@render children()}
  </main>

  <Footer author="Yanren" hasTravelling={false} />
</div>
