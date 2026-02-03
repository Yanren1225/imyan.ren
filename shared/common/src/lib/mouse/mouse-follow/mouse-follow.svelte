<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
    intensity?: number
  }

  let { children, intensity = 3 }: Props = $props()

  let wrapperRef: HTMLDivElement

  const handleMouseMove = (e: MouseEvent) => {
    if (!wrapperRef) return

    const rect = wrapperRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = ((x - centerX) / centerX) * intensity
    const moveY = ((y - centerY) / centerY) * intensity

    wrapperRef.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const handleMouseLeave = () => {
    if (!wrapperRef) return
    wrapperRef.style.transform = ''
  }
</script>

<div
  bind:this={wrapperRef}
  class="mouse-follow-wrapper"
  role="group"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
>
  {@render children?.()}
</div>

<style>
  .mouse-follow-wrapper {
    width: 100%;
    transition: transform 0.1s ease-out;
  }
</style>
