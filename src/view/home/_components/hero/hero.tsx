import './hero.css'

import { Component, createSignal, onMount, onCleanup, createEffect } from 'solid-js'

import { locale, t } from '@/i18n'

export const Hero: Component = () => {
  const [part1, setPart1] = createSignal('')
  const [part2, setPart2] = createSignal('')
  const [part3, setPart3] = createSignal('')

  const getParts = () => {
    const p1 = `${t('hey')},\n${t('im')}${locale() === 'en' ? ' ' : ''}`
    const p2 = t('yanren')
    const p3 = '.'
    return [p1, p2, p3]
  }

  const startTyping = () => {
    setPart1('')
    setPart2('')
    setPart3('')

    const [p1, p2, p3] = getParts()
    const totalLength = p1.length + p2.length + p3.length
    let charIndex = 0

    const interval = setInterval(() => {
      if (charIndex <= totalLength) {
        // Part 1
        if (charIndex <= p1.length) {
          setPart1(p1.slice(0, charIndex))
        }
        // Part 2
        else if (charIndex <= p1.length + p2.length) {
          setPart1(p1)
          setPart2(p2.slice(0, charIndex - p1.length))
        }
        // Part 3
        else {
          setPart1(p1)
          setPart2(p2)
          setPart3(p3.slice(0, charIndex - (p1.length + p2.length)))
        }
        charIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }

  onMount(() => {
    const cleanup = startTyping()
    onCleanup(() => cleanup())
  })

  // Watch for locale changes to restart typing
  createEffect(() => {
    // Access reactive signals to track dependencies
    locale()
    const cleanup = startTyping()
    onCleanup(() => cleanup())
  })

  return (
    <div class="outfit" id="hero">
      <div class="box">
        <p style={{ 'white-space': 'pre-line' }}>
          <span>{part1()}</span>
          <span class="font-bold">{part2()}</span>
          <span>{part3()}</span>
          <span class="cursor-blink">_</span>
        </p>
      </div>
      <div class="info">
        <p>{t('info.0')}</p>
        <p>{t('info.1')}</p>
      </div>
    </div>
  )
}
