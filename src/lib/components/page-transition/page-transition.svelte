<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }
  let { children }: Props = $props()
</script>

<div class="page-transition">
  {@render children?.()}
</div>

<style>
  .page-transition {
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
