<script lang="ts">
  import '../app.css'
  import { Footer, GeekCursor } from '@yanren/common'
  import { i18n } from '$lib/i18n'
</script>

<GeekCursor />

<div class="outfit home">
  <slot></slot>

  <Footer author={i18n.t.yanren} travellingTitle="Travellings" />
</div>
