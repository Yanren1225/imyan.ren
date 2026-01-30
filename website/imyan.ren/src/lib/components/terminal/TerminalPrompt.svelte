<script lang="ts">
  import TerminalLine from './TerminalLine.svelte'
  import TerminalHighlight from './TerminalHighlight.svelte'
  interface Props {
    children?: import('svelte').Snippet
  }
  let { children }: Props = $props()
</script>

<TerminalLine>
  <TerminalHighlight>root@imyan.ren:~$</TerminalHighlight>
  {@render children?.()}
</TerminalLine>
