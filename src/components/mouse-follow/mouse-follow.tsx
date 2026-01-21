import './mouse-follow.css'

import { Component } from 'solid-js'

interface MouseFollowProps {
  children: any
  intensity?: number
}

const MouseFollow: Component<MouseFollowProps> = (props) => {
  let wrapperRef: HTMLDivElement | undefined
  const moveIntensity = props.intensity ?? 3

  const handleMouseMove = (e: MouseEvent) => {
    if (!wrapperRef) return

    const rect = wrapperRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = ((x - centerX) / centerX) * moveIntensity
    const moveY = ((y - centerY) / centerY) * moveIntensity

    wrapperRef.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const handleMouseLeave = () => {
    if (!wrapperRef) return
    wrapperRef.style.transform = ''
  }

  return (
    <div
      ref={wrapperRef}
      class="mouse-follow-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  )
}

export { MouseFollow }
