import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js'

export const GeekCursor: Component = () => {
  // Use refs for direct DOM manipulation to avoid reactivity overhead on every frame
  let cursorRef: HTMLDivElement | undefined

  // State for visual changes (hover/click) which are lower frequency
  const [isClicking, setIsClicking] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)
  // Default to hidden, show only when mouse is moved
  const [isVisible, setIsVisible] = createSignal(false)

  onMount(() => {
    // High performance cursor tracking using requestAnimationFrame
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let requestRef: number

    // Use pointermove to detect input device type
    const updateMousePosition = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        setIsVisible(true)
        mouseX = e.clientX
        mouseY = e.clientY
      } else {
        // Hide cursor for touch inputs
        setIsVisible(false)
      }
    }

    const animate = () => {
      // Linear interpolation for very subtle smoothing (optional, set to 1 for raw input)
      // Using 1.0 for "raw" feeling as requested
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

    // Interaction states
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .clickable')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    onCleanup(() => {
      window.removeEventListener('pointermove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(requestRef)
    })
  })

  return (
    <Show when={isVisible()}>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          'pointer-events': 'none',
          'z-index': 9999,
          // Remove transition on transform for raw performance
          transition: 'width 0.2s, height 0.2s',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          // Initialize off-screen or wait for first move
          transform: 'translate(-100px, -100px)',
        }}
      >
        <div
          style={{
            width: isHovering() ? '40px' : '20px',
            height: isHovering() ? '40px' : '20px',
            border: '1px solid var(--c-text-hover)',
            'background-color': isClicking()
              ? 'var(--c-text-hover)'
              : 'transparent',
            opacity: 0.8,
            transition: 'all 0.2s ease-out',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              background: 'var(--c-text-hover)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        {/* Horizontal Line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300vmax',
            height: '1px',
            background: 'var(--c-text-hover)',
            opacity: 0.1,
            transform: 'translate(-50%, -50%)',
            'pointer-events': 'none',
          }}
        />
        {/* Vertical Line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: '300vmax',
            background: 'var(--c-text-hover)',
            opacity: 0.1,
            transform: 'translate(-50%, -50%)',
            'pointer-events': 'none',
          }}
        />
      </div>
    </Show>
  )
}
