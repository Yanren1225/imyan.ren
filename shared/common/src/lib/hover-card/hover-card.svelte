<script lang="ts">
  import MouseFollow from '../mouse/mouse-follow/mouse-follow.svelte'
  import MouseLight from '../mouse/mouse-light/mouse-light.svelte'

  interface Props {
    as?: string
    enableTopBar?: boolean
    enableLift?: boolean
    enableLight?: boolean
    intensity?: number
    denied?: boolean
    class?: string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let {
    as: tag = 'div',
    enableTopBar = true,
    enableLift = true,
    enableLight = true,
    intensity = 1,
    denied = false,
    class: className,
    children,
    ...others
  }: Props = $props()
</script>

{#snippet content()}
  {@const finalClass = `hover-card-container ${className || ''} ${enableTopBar ? 'has-top-bar' : ''} ${enableLift ? 'has-lift' : ''} ${denied ? 'is-denied' : ''}`}
  {#if enableLight}
    <MouseLight as={tag} class={finalClass} {...others}>
      {@render children?.()}
    </MouseLight>
  {:else}
    <svelte:element this={tag} class={finalClass} {...others}>
      {@render children?.()}
    </svelte:element>
  {/if}
{/snippet}

{#if intensity > 0}
  <MouseFollow {intensity}>
    {@render content()}
  </MouseFollow>
{:else}
  {@render content()}
{/if}

<style>
  :global(.hover-card-container) {
    display: flex;
    background-color: var(--c-card-bg);
    /* Default padding can be overridden by class */
    border-radius: 0;
    transition: all 0.2s ease-out;
    border: 1px solid var(--c-grid);
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: var(--c-text);

    /* Reset link styles if it's an <a> tag */
    @media (hover: hover) {
      &:hover {
        color: var(--c-text);
      }
    }
  }

  /* --- Top Bar (Tech Deco Corner) --- */
  :global(.hover-card-container.has-top-bar)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--c-neon);
    transition: width 0.3s ease;
  }

  @media (hover: hover) {
    :global(.hover-card-container.has-top-bar):hover::before {
      width: 100%;
    }
  }

  /* --- Hover Effects --- */
  @media (hover: hover) {
    :global(.hover-card-container):hover {
      background-color: var(--c-card-bg-hover);
      border-color: var(--c-neon);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    :global(.hover-card-container.has-lift):hover {
      transform: translateY(-2px);
    }
  }

  /* --- Access Denied State --- */
  :global(.hover-card-container.is-denied) {
    opacity: 0.7;
    border-color: #ff3c3c !important;
    background: repeating-linear-gradient(
      45deg,
      rgba(255, 60, 60, 0.05),
      rgba(255, 60, 60, 0.05) 10px,
      rgba(0, 0, 0, 0.05) 10px,
      rgba(0, 0, 0, 0.05) 20px
    );
    cursor: not-allowed !important;

    @media (hover: hover) {
      &:hover {
        transform: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
        border-color: #ff3c3c !important;
      }
    }

    &::before {
      background-color: #ff3c3c !important;
      width: 100% !important;
      opacity: 0.5;
    }

    :global(img) {
      filter: grayscale(100%) contrast(1.2) !important;
      border-color: #ff3c3c !important;
    }
  }
</style>
