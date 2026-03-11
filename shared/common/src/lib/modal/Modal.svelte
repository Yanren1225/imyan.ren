<script lang="ts">
  import { fade, scale } from 'svelte/transition'

  interface Props {
    title?: string
    content?: string
    confirmText?: string
    cancelText?: string
    type?: 'info' | 'warning' | 'error'
    isOpen?: boolean
    onclose?: () => void
    onconfirm?: () => void
  }

  let {
    title = 'Confirm',
    content = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info',
    isOpen = false,
    onclose = () => {},
    onconfirm = () => {},
  }: Props = $props()


</script>

{#if isOpen}
  <div
    class="modal-overlay"
    transition:fade={{ duration: 200 }}
    onclick={onclose}
    role="presentation"
  >
    <div
      class="modal-content type-{type}"
      transition:scale={{ duration: 200, start: 0.95 }}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === 'Escape' && onclose()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div class="modal-header">
        <h3 class="modal-title">{title}</h3>
        <button class="close-btn" onclick={onclose} aria-label="Close dialog">
          <div class="i-material-symbols-close text-xl"></div>
        </button>
      </div>

      <div class="modal-body">
        {#if content}
          <p>{content}</p>
        {:else}
          <!-- svelte-ignore slot_element_deprecated -->
          <slot></slot>
        {/if}
      </div>

      <div class="modal-footer">
        <button class="btn btn-cancel" onclick={onclose}>{cancelText}</button>
        <button class="btn btn-confirm" onclick={onconfirm}>{confirmText}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 0.8);
  }

  .modal-content {
    width: 90%;
    max-width: 400px;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    box-shadow: 0 0 15px rgb(0 0 0 / 0.5);
    font-family: 'Fira Code', monospace;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--c-border);
    background: var(--c-bg-soft);
  }

  .modal-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--c-text);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--c-text);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: all 0.2s;
  }

  .close-btn:hover {
    opacity: 1;
    background: var(--c-bg-soft);
    color: var(--c-neon);
  }

  .modal-body {
    padding: 24px;
    color: var(--c-text);
    font-size: 0.95rem;
    background: var(--c-bg);
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px;
    border-top: 1px solid var(--c-border);
    background: var(--c-bg-soft);
  }

  .btn {
    padding: 6px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    font-family: inherit;
    text-transform: uppercase;
  }

  .btn-cancel {
    color: var(--c-text);
    border: 1px solid var(--c-text);
    opacity: 0.6;
  }

  .btn-cancel:hover {
    opacity: 1;
    background: rgb(255 255 255 / 0.1);
  }

  .btn-confirm {
    background: var(--c-neon);
    color: #000;
    border: 1px solid var(--c-neon);
    font-weight: 600;
  }

  .btn-confirm:hover {
    background: transparent;
    color: var(--c-neon);
  }

  /* Warning Type Styling */
  .modal-content.type-warning {
    border-color: #ef4444;
  }

  .type-warning .modal-header {
    border-color: #ef4444;
    background: rgb(239 68 68 / 0.05);
  }

  .type-warning .modal-title {
    color: #ef4444;
  }

  .type-warning .close-btn:hover {
    background: rgb(239 68 68 / 0.1);
    color: #ef4444;
  }

  .type-warning .btn-confirm {
    background: #ef4444;
    border-color: #ef4444;
    color: white;
  }

  .type-warning .btn-confirm:hover {
    background: transparent;
    color: #ef4444;
  }
</style>
