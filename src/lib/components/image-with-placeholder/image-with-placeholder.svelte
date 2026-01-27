<script lang="ts">
  import './image-with-placeholder.css'

  interface Props {
    src: string
    alt: string
    class?: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
    onerror?: (e: Event) => void
  }

  let {
    src,
    alt,
    class: className,
    imgClass,
    loading = 'lazy',
    onerror,
  }: Props = $props()

  let isLoading = $state(true)

  $effect(() => {
    // Reset loading when src changes
    src
    isLoading = true
  })
</script>

<div class="img-placeholder-container {className || ''}">
  {#if isLoading}
    <div class="img-placeholder-shim"></div>
  {/if}

  <img
    class="img-with-placeholder {imgClass || ''} {isLoading
      ? 'is-loading'
      : ''}"
    {src}
    {alt}
    {loading}
    decoding="async"
    onload={() => (isLoading = false)}
    onerror={(e) => {
      isLoading = false
      onerror?.(e)
    }}
  />
</div>
