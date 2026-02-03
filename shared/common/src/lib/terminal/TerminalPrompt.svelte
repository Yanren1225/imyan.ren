<script lang="ts">
  import TerminalLine from './TerminalLine.svelte'
  import TerminalCursor from './TerminalCursor.svelte'

  interface Props {
    /**
     * The hostname to display (e.g., "root@imyan.ren:~$")
     */
    hostname?: string
    /**
     * Whether to show the blinking cursor
     */
    showCursor?: boolean
    children?: import('svelte').Snippet
  }

  let {
    hostname = 'root@imyan.ren:~$',
    showCursor = false,
    children,
  }: Props = $props()
</script>

<TerminalLine>
  <span class="hostname">{hostname}</span>{' '}
  {@render children?.()}
  {#if showCursor}
    <TerminalCursor />
  {/if}
</TerminalLine>

<style>
  .hostname {
    color: var(--c-terminal-hostname);
    font-weight: bold;
  }
</style>
