<span class="cursor"></span>

<style>
  .cursor {
    display: inline-block;
    width: 0.6em;
    height: 1.2em;
    background: var(--c-neon);
    animation: blink 1s step-end infinite;
    vertical-align: text-bottom;
    margin-left: 0.25ch;
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
