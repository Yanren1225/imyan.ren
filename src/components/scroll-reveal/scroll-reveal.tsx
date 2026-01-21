import {
  type ParentComponent,
  createSignal,
  onMount,
  onCleanup,
} from 'solid-js'
import './scroll-reveal.css'

interface ScrollRevealProps {
  delay?: number
  threshold?: number
}

export const ScrollReveal: ParentComponent<ScrollRevealProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false)
  let ref: HTMLDivElement | undefined

  onMount(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, props.delay || 0)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: props.threshold || 0.1 },
    )

    observer.observe(ref)

    onCleanup(() => observer.disconnect())
  })

  return (
    <div ref={ref} class="scroll-reveal" classList={{ visible: isVisible() }}>
      {props.children}
    </div>
  )
}
