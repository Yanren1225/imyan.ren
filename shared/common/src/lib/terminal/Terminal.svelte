<script lang="ts">
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

<style>
  .terminal-box {
    background: var(--c-card-bg);
    padding: 30px;
    box-sizing: border-box;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    border: 1px solid var(--c-grid);
    font-family: 'Fira Code', 'Consolas', monospace;
    color: var(--c-text);
    position: relative;
  }

  .terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--c-grid);
    font-family: 'Fira Code', monospace;
  }

  .tui-controls {
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: var(--c-text);
    opacity: 0.5;
  }

  .tui-controls .control {
    cursor: pointer;
    transition: color 0.2s;
  }

  .tui-controls .control:hover {
    color: var(--c-neon);
  }

  .tui-controls .close:hover {
    color: #ff3c3c;
  }

  .tui-title {
    font-size: 12px;
    opacity: 0.5;
  }

  .terminal-content {
    font-size: 16px;
    line-height: 1.6;
    word-break: break-all;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @media (max-width: 600px) {
    .terminal-box {
      padding: 20px;
    }

    .terminal-content {
      font-size: 14px;
    }
  }
</style>
