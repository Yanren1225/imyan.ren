<script lang="ts">
  import './page-transition.css'
  interface Props {
    children?: import('svelte').Snippet
  }
  let { children }: Props = $props()
</script>

<div class="page-transition">
  {@render children?.()}
</div>
