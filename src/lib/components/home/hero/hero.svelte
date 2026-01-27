<script lang="ts">
  import './hero.css'
  import { t, getLocale } from '$lib/i18n'
  import { onMount } from 'svelte'

  let part1 = $state('')
  let part2 = $state('')
  let part3 = $state('')

  function getParts() {
    const l = getLocale()
    const p1 = `${t('hey')},\n${t('im')}${l === 'en' ? ' ' : ''}`
    const p2 = t('yanren') as string
    const p3 = '.'
    return [p1, p2, p3]
  }

  $effect(() => {
    // getParts uses getLocale(), so this tracks changes.
    const [p1, p2, p3] = getParts()

    // Clear check to avoid glitch if it's just mounting?
    // Effect runs after mount.
    // Logic: type out from scratch on locale change.

    // Reset
    part1 = ''
    part2 = ''
    part3 = ''

    let charIndex = 0
    const totalLength = p1.length + p2.length + p3.length

    // We need to properly clear interval if effects re-run.
    const interval = setInterval(() => {
      if (charIndex <= totalLength) {
        if (charIndex <= p1.length) {
          part1 = p1.slice(0, charIndex)
        } else if (charIndex <= p1.length + p2.length) {
          part1 = p1
          part2 = p2.slice(0, charIndex - p1.length)
        } else {
          part1 = p1
          part2 = p2
          part3 = p3.slice(0, charIndex - (p1.length + p2.length))
        }
        charIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  })
</script>

<div class="font-outfit" id="hero">
  <div class="box">
    <p style="white-space: pre-line">
      <span>{part1}</span>
      <span class="font-bold">{part2}</span>
      <span>{part3}</span>
      <span class="cursor-blink">_</span>
    </p>
  </div>
  <div class="info">
    <p>{t('info.0')}</p>
    <p>{t('info.1')}</p>
  </div>
</div>
