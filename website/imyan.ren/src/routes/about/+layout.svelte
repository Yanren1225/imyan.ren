<script lang="ts">
  import { MarkdownBody } from '@yanren/common'

  let { children } = $props()
</script>

<MarkdownBody>
  {@render children()}
</MarkdownBody>
