<script lang="ts">
  import { fade } from 'svelte/transition'

  interface Props {
    src: string
    alt: string
    size?: number
    class?: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
    onerror?: (e: Event) => void
  }

  let {
    src,
    alt,
    size = 60,
    class: className,
    imgClass,
    loading = 'lazy',
    onerror,
  }: Props = $props()

  let isLoading = $state(true)

  $effect(() => {
    src
    isLoading = true
  })
</script>

<div
  class="img-placeholder-container {className || ''}"
  style:--size={size + 'px'}
>
  {#if isLoading}
    <div class="img-placeholder-shim" out:fade={{ duration: 300 }}></div>
  {/if}

  <img
    class="img-with-placeholder {imgClass || ''}"
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

<style>
  .img-placeholder-container {
    position: relative;
    overflow: hidden;
    display: block;
    background-color: var(--c-bg-soft);
    font-size: 0;
    width: var(--size);
    height: var(--size);
    border: 1px solid var(--c-grid);
  }

  .img-with-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  .img-placeholder-shim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--c-bg-soft);
    z-index: 1;
    pointer-events: none;
  }

  /* HUD Corners */
  .img-placeholder-shim::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-top-color: var(--c-neon);
    border-bottom-color: var(--c-neon);
    opacity: 0.8;
    animation: bracket-pulse 1.5s infinite ease-in-out;
    box-sizing: border-box;
  }

  /* Inner Scanning Line */
  .img-placeholder-shim::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 255, 0, 0.1) 40%,
      var(--c-neon) 50%,
      rgba(0, 255, 0, 0.1) 60%,
      transparent 100%
    );
    background-size: 100% 200%;
    animation: hud-scan 2s linear infinite;
    opacity: 0.5;
  }

  @keyframes bracket-pulse {
    0%,
    100% {
      transform: scale(0.9);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes hud-scan {
    0% {
      background-position: 0% -100%;
    }

    100% {
      background-position: 0% 200%;
    }
  }
</style>
