<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
    delay?: number
    threshold?: number
  }

  let { children, delay = 0, threshold = 0.1 }: Props = $props()

  let isVisible = $state(false)

  function reveal(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    observer.observe(node)

    return {
      destroy() {
        observer.disconnect()
      },
    }
  }
</script>

<div
  use:reveal
  class="scroll-reveal"
  class:is-visible={isVisible}
  style:transition-delay="{delay}ms"
>
  {@render children?.()}
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scroll-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
