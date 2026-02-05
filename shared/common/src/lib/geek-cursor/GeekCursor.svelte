<script lang="ts">
  import { Spring } from 'svelte/motion'

  let isClicking = $state(false)
  let isHovering = $state(false)
  let isVisible = $state(false)

  const coords = new Spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.8,
      damping: 0.9,
    },
  )

  const handleMove = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      isVisible = true
      coords.target = { x: e.clientX, y: e.clientY }
    } else {
      isVisible = false
    }
  }

  const handleMouseOver = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button, .clickable')) {
      isHovering = true
    } else {
      isHovering = false
    }
  }
</script>

<svelte:window
  onpointermove={handleMove}
  onmousedown={() => (isClicking = true)}
  onmouseup={() => (isClicking = false)}
  onmouseover={handleMouseOver}
/>

<svelte:head>
  {#if isVisible}
    <style>
      @media (hover: hover) and (pointer: fine) {
        html,
        body,
        * {
          cursor: none !important;
        }
      }
    </style>
  {/if}
</svelte:head>

{#if isVisible}
  <div
    style:position="fixed"
    style:top="0"
    style:left="0"
    style:width="20px"
    style:height="20px"
    style:pointer-events="none"
    style:z-index="9999"
    style:transition="width 0.2s, height 0.2s"
    style:display="flex"
    style:align-items="center"
    style:justify-content="center"
    style:transform="translate({coords.current.x - 10}px, {coords.current.y -
      10}px)"
  >
    <div
      style:width={isHovering ? '40px' : '20px'}
      style:height={isHovering ? '40px' : '20px'}
      style:border="1px solid var(--c-text-hover)"
      style:background-color={isClicking
        ? 'var(--c-text-hover)'
        : 'transparent'}
      style:opacity="0.8"
      style:transition="all 0.2s ease-out"
    >
      <div
        style:position="absolute"
        style:top="50%"
        style:left="50%"
        style:width="4px"
        style:height="4px"
        style:background="var(--c-text-hover)"
        style:transform="translate(-50%, -50%)"
      ></div>
    </div>
    <!-- Horizontal Line -->
    <div
      style:position="absolute"
      style:top="50%"
      style:left="50%"
      style:width="300vmax"
      style:height="1px"
      style:background="var(--c-text-hover)"
      style:opacity="0.1"
      style:transform="translate(-50%, -50%)"
      style:pointer-events="none"
    ></div>
    <!-- Vertical Line -->
    <div
      style:position="absolute"
      style:top="50%"
      style:left="50%"
      style:width="1px"
      style:height="300vmax"
      style:background="var(--c-text-hover)"
      style:opacity="0.1"
      style:transform="translate(-50%, -50%)"
      style:pointer-events="none"
    ></div>
  </div>
{/if}
