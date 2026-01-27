<script lang="ts">
  import './terminal.css'
  interface Props {
    children?: import('svelte').Snippet
    class?: string
    [key: string]: any
  }
  let { children, class: className, ...others }: Props = $props()
</script>

<div class="terminal-box {className || ''}" {...others}>
  <div class="terminal-header">
    <div class="tui-controls">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="control clickable">[-]</span>
      <span class="control clickable">[□]</span>
      <span class="control clickable close">[×]</span>
    </div>
    <div class="tui-title">yanren@term:~</div>
  </div>
  <div class="terminal-content">
    {@render children?.()}
  </div>
</div>
