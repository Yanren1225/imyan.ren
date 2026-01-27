<script lang="ts">
  import './mouse-light.css'

  interface Props {
    as?: string
    class?: string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let {
    as: tag = 'div',
    class: className,
    children,
    ...others
  }: Props = $props()

  function onMouseMove(e: MouseEvent) {
    const element = e.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    element.style.setProperty('--mouse-x', `${x}px`)
    element.style.setProperty('--mouse-y', `${y}px`)
  }
</script>

<svelte:element
  this={tag}
  class="mouse-light {className || ''}"
  onmousemove={onMouseMove}
  {...others}
>
  <div class="light-effect"></div>
  {@render children?.()}
</svelte:element>
