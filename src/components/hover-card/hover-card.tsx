import { Component, JSX, mergeProps, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { MouseFollow } from '@/components/mouse-follow'
import { MouseLight } from '@/components/mouse-light' // Import directly as per your usage model
import './hover-card.css'

interface HoverCardProps extends JSX.HTMLAttributes<
  HTMLAnchorElement | HTMLDivElement
> {
  as?: 'a' | 'div' | 'button' // Flexible element type
  href?: string
  target?: string
  rel?: string

  // Configuration
  enableTopBar?: boolean
  enableLift?: boolean
  enableLight?: boolean // Toggle MouseLight
  intensity?: number // MouseFollow intensity, default 1 but configurable
}

export const HoverCard: Component<HoverCardProps> = (props) => {
  const merged = mergeProps(
    {
      enableTopBar: true,
      enableLift: true,
      enableLight: true,
      intensity: 1,
      as: 'div' as const,
    },
    props,
  )

  const content = (
    <Dynamic
      component={merged.enableLight ? MouseLight : merged.as}
      {...props} // Spread standard HTML attributes
      as={merged.enableLight ? merged.as : undefined} // MouseLight needs 'as', standard elements don't need 'as' prop usually (Dynamic handles component, but if it's a string tag, spread props might be issue if 'as' remains? Solid handles this well usually)
      class={`hover-card-container ${props.class || ''}`}
      classList={{
        'has-top-bar': merged.enableTopBar,
        'has-lift': merged.enableLift,
        ...(props.classList || {}), // Preserve user classList if any
      }}
    >
      {props.children}
    </Dynamic>
  )

  return (
    <Show when={merged.intensity > 0} fallback={content}>
      <MouseFollow intensity={merged.intensity}>{content}</MouseFollow>
    </Show>
  )
}
