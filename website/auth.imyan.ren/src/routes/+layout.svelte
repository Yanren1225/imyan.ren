<script lang="ts">
  import 'virtual:uno.css'
  import '@unocss/reset/tailwind.css'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
