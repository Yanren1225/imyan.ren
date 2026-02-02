<script lang="ts">
  import {
    Terminal,
    TerminalPrompt,
    TerminalLine,
    TerminalHighlight,
    TerminalCursor,
  } from '@yanren/common'
</script>

<div id="about">
  <Terminal class="about-terminal">
    <TerminalPrompt>cat /etc/profile</TerminalPrompt>
    <TerminalLine># Loading user profile configuration...</TerminalLine>
    <TerminalLine>
      module.load('yanren_profile'){' '}
      <TerminalHighlight>...Pending</TerminalHighlight>
    </TerminalLine>
    <TerminalLine>
      {'>'} User profile is currently under construction.
    </TerminalLine>
    <TerminalLine>{'>'} Please check back later.</TerminalLine>
    <TerminalPrompt>
      <TerminalCursor />
    </TerminalPrompt>
  </Terminal>
</div>

<style>
  #about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }

  :global(.about-terminal) {
    max-width: 600px;
  }
</style>
