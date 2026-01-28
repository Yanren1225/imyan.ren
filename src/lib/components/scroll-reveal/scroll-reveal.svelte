<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    children?: import('svelte').Snippet
    delay?: number
    threshold?: number
  }

  let { children, delay = 0, threshold = 0.1 }: Props = $props()

  let isVisible = $state(false)
  let ref: HTMLDivElement

  onMount(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible = true
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    observer.observe(ref)

    return () => observer.disconnect()
  })
</script>

<div bind:this={ref} class="scroll-reveal" class:is-visible={isVisible}>
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
