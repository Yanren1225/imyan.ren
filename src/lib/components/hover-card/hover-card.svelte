<script lang="ts">
  import MouseFollow from '../mouse-follow/mouse-follow.svelte'
  import MouseLight from '../mouse-light/mouse-light.svelte'
  import './hover-card.css'

  interface Props {
    as?: string
    enableTopBar?: boolean
    enableLift?: boolean
    enableLight?: boolean
    intensity?: number
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
    class: className,
    children,
    ...others
  }: Props = $props()
</script>

{#snippet content()}
  {@const finalClass = `hover-card-container ${className || ''} ${enableTopBar ? 'has-top-bar' : ''} ${enableLift ? 'has-lift' : ''}`}
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
