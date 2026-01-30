<script lang="ts">
  import '../app.css'
  import 'virtual:uno.css'
  import { Footer, GeekCursor } from '@yanren/common'
  import { i18n } from '$lib/i18n'

  let { children } = $props()
</script>

<GeekCursor />

<div class="app-layout">
  <main>
    {@render children()}
  </main>

  <Footer author={i18n.t.yanren} hasTravelling={false} />
</div>
