<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
    [key: string]: any
  }
  let { children, ...others }: Props = $props()
</script>

<span class="highlight" {...others}>{@render children?.()}</span>
