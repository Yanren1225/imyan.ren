<script lang="ts">
  import { page } from '$app/state'
  import Terminal from '$lib/components/terminal/Terminal.svelte'
  import TerminalPrompt from '$lib/components/terminal/TerminalPrompt.svelte'
  import TerminalLine from '$lib/components/terminal/TerminalLine.svelte'
</script>

<div class="error-page">
  <Terminal>
    <TerminalPrompt>
      <span class="command">cat /status</span>
    </TerminalPrompt>
    <TerminalLine>
      <span class="error-code">{page.status}</span>
    </TerminalLine>

    <TerminalPrompt>
      <span class="command">cat /message</span>
    </TerminalPrompt>
    <TerminalLine>
      <span class="error-message">{page.error?.message || 'Unknown Error'}</span
      >
    </TerminalLine>

    <TerminalPrompt>
      <span class="command">help</span>
    </TerminalPrompt>
    <TerminalLine>Available commands:</TerminalLine>
    <TerminalLine>
      <a href="/" class="home-link">cd /home</a>
      <span class="help-desc">- Return to homepage</span>
    </TerminalLine>

    <TerminalPrompt>
      <span class="cursor">_</span>
    </TerminalPrompt>
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

  .cursor {
    margin-left: 10px;
    animation: blink 1s step-end infinite;
    font-weight: bold;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
