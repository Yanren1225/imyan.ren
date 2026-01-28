<script lang="ts">
  import Terminal from '$lib/components/terminal/Terminal.svelte'
  import TerminalHighlight from '$lib/components/terminal/TerminalHighlight.svelte'
  import TerminalLine from '$lib/components/terminal/TerminalLine.svelte'
  import TerminalPrompt from '$lib/components/terminal/TerminalPrompt.svelte'
  import { i18n } from '$lib/i18n'
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

  /* .line is not used in HTML but might be used in child components? No, TerminalLine uses slots. */
  /* Wait, TerminalLine doesn't seem to have class="line" in usage, but let's check styles. */
  /* The css provided has .line, .cursor::after, .highlight. These are used inside the slots passed to Terminal items or in the page itself? */
  /* In the HTML: <TerminalLine>... <TerminalHighlight>... <span class="cursor"></span> */
  /* So these classes match elements in the Markup. */
  /* Since they are in slots passed to components, scoped CSS might apply if they are in the same component file. */
  /* Yes, styles in +page.svelte apply to markup in +page.svelte. */
  /* However, if they are passed as children to another component, scoped CSS *does* apply to the slot content. */

  .cursor::after {
    content: '_';
    animation: blink 1s step-end infinite;
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

  :global(.highlight) {
    color: var(--c-brand);
    font-weight: bold;
  }
</style>
