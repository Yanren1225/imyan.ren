<script lang="ts">
  import { modal } from './store'
  import Modal from './Modal.svelte'
</script>

{#each $modal as instance (instance.id)}
  <Modal
    title={instance.title}
    content={instance.content}
    confirmText={instance.confirmText}
    cancelText={instance.cancelText}
    type={instance.type || 'info'}
    isOpen={instance.isOpen}
    onconfirm={instance.onConfirm}
    onclose={instance.onCancel || (() => modal.close(instance.id))}
  />
{/each}
