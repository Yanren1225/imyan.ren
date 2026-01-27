<script lang="ts">
  import './scroll-reveal.css'
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

<div bind:this={ref} class="scroll-reveal" class:visible={isVisible}>
  {@render children?.()}
</div>
