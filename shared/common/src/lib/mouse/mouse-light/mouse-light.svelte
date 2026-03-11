<script lang="ts">
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

  const onMouseMove = (e: MouseEvent) => {
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

<style>
  .mouse-light {
    position: relative;
    overflow: hidden;
  }

  .mouse-light .light-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: radial-gradient(
      300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgb(from var(--c-text) r g b / 0.03),
      transparent 40%
    );
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 1;
  }

  .mouse-light:hover .light-effect {
    opacity: 1;
  }

  .mouse-light > *:not(.light-effect) {
    position: relative;
    z-index: 2;
  }
</style>
