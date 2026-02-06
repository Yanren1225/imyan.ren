<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { toast } from './store'
  import type { Toast } from './store'

  export let item: Toast

  let progress = 100
  let interval: ReturnType<typeof setInterval>
  let isPaused = false
  const step = 10 // Update every 10ms for smooth progress bar

  onMount(() => {
    startTimer()
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function startTimer() {
    clearInterval(interval)
    interval = setInterval(() => {
      if (!isPaused) {
        progress -= (step / item.duration) * 100
        if (progress <= 0) {
          toast.remove(item.id)
          clearInterval(interval)
        }
      }
    }, step)
  }

  function pause() {
    isPaused = true
  }

  function resume() {
    isPaused = false
  }

  function close() {
    toast.remove(item.id)
  }

  function getIcon(type: string) {
    switch (type) {
      case 'success':
        return 'i-material-symbols-check-circle-outline'
      case 'warning':
        return 'i-material-symbols-warning-outline'
      case 'error':
        return 'i-material-symbols-error-outline'
      default:
        return 'i-material-symbols-info-outline'
    }
  }
</script>

<div
  class="toast toast-{item.type}"
  in:fly={{ x: 20, duration: 300 }}
  out:fade={{ duration: 200 }}
  onmouseenter={pause}
  onmouseleave={resume}
  role="alert"
>
  <div class="toast-content">
    <div class="icon {getIcon(item.type)} text-xl"></div>
    <div class="message">{item.message}</div>
    <button class="close-btn" onclick={close} aria-label="Close notification">
      <div class="i-material-symbols-close text-lg"></div>
    </button>
  </div>
  <div class="progress-bar" style="width: {progress}%"></div>
</div>

<style>
  .toast {
    position: relative;
    width: 300px;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    margin-bottom: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    pointer-events: auto;
    font-family: 'Fira Code', monospace;
  }

  .toast-content {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
  }

  .message {
    flex: 1;
    font-size: 0.9rem;
    color: var(--c-text);
  }

  .icon {
    color: var(--c-neon);
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--c-text);
    opacity: 0.5;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .close-btn:hover {
    opacity: 1;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--c-neon);
    transition: width 10ms linear;
    opacity: 0.7;
  }

  /* Type variants */
  .toast-warning {
    border-color: #f59e0b;
  }
  .toast-warning .icon {
    color: #f59e0b;
  }
  .toast-warning .progress-bar {
    background: #f59e0b;
  }

  .toast-error {
    border-color: #ef4444;
  }
  .toast-error .icon {
    color: #ef4444;
  }
  .toast-error .progress-bar {
    background: #ef4444;
  }
</style>
