<script lang="ts">
  import './about.css'
  import Terminal from '$lib/components/terminal/Terminal.svelte'
  import TerminalHighlight from '$lib/components/terminal/TerminalHighlight.svelte'
  import TerminalLine from '$lib/components/terminal/TerminalLine.svelte'
  import TerminalPrompt from '$lib/components/terminal/TerminalPrompt.svelte'
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
      <span class="cursor"></span>
    </TerminalPrompt>
  </Terminal>
</div>
