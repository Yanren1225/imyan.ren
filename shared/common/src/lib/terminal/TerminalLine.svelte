<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
    class?: string
    [key: string]: any
  }
  let { children, class: className, ...others }: Props = $props()
</script>

<div class="line {className || ''}" {...others}>
  {@render children?.()}
</div>
