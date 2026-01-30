<script lang="ts">
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte'
  import Payments from '$lib/components/Payments.svelte'
  import {
    Terminal,
    TerminalLine,
    TerminalPrompt,
    TerminalHighlight,
  } from '@yanren/common'
</script>

<div class="page-container">
  <div class="language-wrapper">
    <LanguageSwitcher />
  </div>

  <div class="terminal-wrapper">
    <Terminal>
      <TerminalPrompt>cat /etc/payments</TerminalPrompt>
      <TerminalLine># Loading payment modules...</TerminalLine>
      <TerminalLine>
        module.load('payment_gateways') <TerminalHighlight
          >...Done</TerminalHighlight
        >
      </TerminalLine>
      <TerminalLine>{'>'} Select a method below to proceed.</TerminalLine>

      <Payments />
    </Terminal>
  </div>
</div>

<style>
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
    margin: 0 auto;
  }

  .language-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .terminal-wrapper {
    width: 100%;
  }
</style>
