<script lang="ts">
  import { toast } from './store'
  import Toast from './Toast.svelte'
</script>

<div class="toaster">
  {#each $toast as item (item.id)}
    <Toast {item} />
  {/each}
</div>

<style>
  .toaster {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    pointer-events: none;
  }
</style>
