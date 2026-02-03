<script lang="ts">
  import Terminal from '../terminal/Terminal.svelte'
  import TerminalPrompt from '../terminal/TerminalPrompt.svelte'
  import TerminalLine from '../terminal/TerminalLine.svelte'

  interface Props {
    status?: number | string
    message?: string
    hostname?: string
  }

  let {
    status = 404,
    message = 'Unknown Error',
    hostname = 'root@imyan.ren:~$',
  }: Props = $props()
</script>

<div class="error-page">
  <Terminal>
    <TerminalPrompt {hostname}>
      <span class="command">cat /status</span>
    </TerminalPrompt>
    <TerminalLine>
      <span class="error-code">{status}</span>
    </TerminalLine>

    <TerminalPrompt {hostname}>
      <span class="command">cat /message</span>
    </TerminalPrompt>
    <TerminalLine>
      <span class="error-message">{message}</span>
    </TerminalLine>

    <TerminalPrompt {hostname}>
      <span class="command">help</span>
    </TerminalPrompt>
    <TerminalLine>Available commands:</TerminalLine>
    <TerminalLine>
      <a href="/" class="home-link">cd /home</a>
      <span class="help-desc">- Return to homepage</span>
    </TerminalLine>

    <TerminalPrompt {hostname} showCursor></TerminalPrompt>
  </Terminal>
</div>

<style>
  .error-page {
    padding: 80px 20px;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 60vh;
  }

  .command {
    margin-left: 10px;
    color: var(--c-text);
  }

  .error-code {
    color: #ff5f5f;
    font-weight: bold;
  }

  .error-message {
    color: var(--c-text);
    opacity: 0.9;
  }

  .home-link {
    color: var(--c-neon);
    text-decoration: underline;
    font-weight: bold;
  }

  .home-link:hover {
    text-decoration: none;
    opacity: 0.8;
  }

  .help-desc {
    margin-left: 10px;
    opacity: 0.7;
    font-size: 0.9em;
  }
</style>
