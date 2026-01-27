<script lang="ts">
  import { onMount } from 'svelte'

  let cursorRef: HTMLDivElement | undefined = $state()
  let isClicking = $state(false)
  let isHovering = $state(false)
  let isVisible = $state(false)

  onMount(() => {
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let requestRef: number

    const updateMousePosition = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        isVisible = true
        mouseX = e.clientX
        mouseY = e.clientY
      } else {
        isVisible = false
      }
    }

    const animate = () => {
      const ease = 1
      const dx = mouseX - currentX
      const dy = mouseY - currentY
      currentX += dx * ease
      currentY += dy * ease

      if (cursorRef) {
        cursorRef.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`
      }

      requestRef = requestAnimationFrame(animate)
    }

    requestRef = requestAnimationFrame(animate)
    window.addEventListener('pointermove', updateMousePosition, {
      passive: true,
    })

    const handleMouseDown = () => (isClicking = true)
    const handleMouseUp = () => (isClicking = false)
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .clickable')) {
        isHovering = true
      } else {
        isHovering = false
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('pointermove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(requestRef)
    }
  })
</script>

{#if isVisible}
  <div
    bind:this={cursorRef}
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
    style:transform="translate(-100px, -100px)"
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
