import { type JSX, type Component, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import './mouse-light.css'

type MouseLightProps = {
  as?: string
  children?: JSX.Element
  [key: string]: any
}

export const MouseLight: Component<MouseLightProps> = (props) => {
  const [local, others] = splitProps(props, [
    'as',
    'children',
    'class',
    'classList',
  ])

  const handleMouseMove = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    element.style.setProperty('--mouse-x', `${x}px`)
    element.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <Dynamic
      component={local.as || 'div'}
      class={`mouse-light ${local.class || ''}`}
      classList={local.classList}
      onMouseMove={handleMouseMove}
      {...others}
    >
      <div class="light-effect" />
      {local.children}
    </Dynamic>
  )
}
