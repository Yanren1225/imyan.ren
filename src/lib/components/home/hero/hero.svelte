<script lang="ts">
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

<style>
  #hero {
    margin-top: 4.5rem;

    .block {
      display: block;
    }

    .info {
      margin-top: 24px;
    }

    .box p {
      font-size: 3rem;
      line-height: 1;
      color: var(--c-text);

      & .font-bold {
        color: var(--c-text-hover);

        @media (prefers-color-scheme: dark) {
          text-shadow:
            0 0 5px var(--c-neon),
            0 0 15px var(--c-neon),
            0 0 30px var(--c-neon);
          animation: neon-flicker 15s linear infinite;
        }

        @media (prefers-color-scheme: light) {
          position: relative;
          animation: glitch-anim 4s infinite;
        }
      }
    }

    .info p {
      font-size: 1.125rem;
      line-height: 1.75rem;
      margin-top: 0.5rem;
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  .cursor-blink {
    display: inline-block;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
    color: var(--c-text-hover);
  }

  @keyframes movement {
    0% {
      background-position:
        -30vmax -30vmax,
        40vmax -20vmax,
        10vmax 40vmax,
        center center;
    }

    100% {
      background-position:
        -10vmax -10vmax,
        20vmax 0vmax,
        30vmax 20vmax,
        center center;
    }
  }

  @keyframes neon-flicker {
    /* Steady On (0-40%) - 6 seconds */
    0%,
    39.9% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    /* Start Animation (Dim State) */
    40%,
    40.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    /* S: ... */
    41%,
    42% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    42.1%,
    42.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    43%,
    44% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    44.1%,
    44.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    45%,
    46% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    46.1%,
    49.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    /* Gap */

    /* O: --- */
    50%,
    54% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    54.1%,
    55.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    56%,
    60% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    60.1%,
    61.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    62%,
    66% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    66.1%,
    69.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    /* Gap */

    /* S: ... */
    70%,
    71% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    71.1%,
    72.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    73%,
    74% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    74.1%,
    75.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    76%,
    77% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }

    77.1%,
    79.9% {
      opacity: 0.3;
      text-shadow: 0 0 2px var(--c-neon);
    }

    /* Final Gap to loop */

    /* Steady On (80-100%) */
    80%,
    100% {
      opacity: 1;
      text-shadow:
        0 0 5px var(--c-neon),
        0 0 15px var(--c-neon),
        0 0 30px var(--c-neon),
        0 0 60px var(--c-neon);
    }
  }

  @keyframes glitch-anim {
    0% {
      text-shadow: none;
      transform: none;
    }
    /* First glitch (earlier and stronger) */
    20% {
      text-shadow: none;
      transform: none;
    }
    21% {
      text-shadow:
        3px 0 #ff3c3c,
        -3px 0 #00d2ff;
      transform: skewX(15deg);
    }
    22% {
      text-shadow:
        -3px 0 #ff3c3c,
        3px 0 #00d2ff;
      transform: skewX(-15deg);
    }
    23% {
      text-shadow:
        2px 2px #ff3c3c,
        -2px -2px #00d2ff;
      transform: translate(-2px, 2px);
    }
    24% {
      text-shadow: none;
      transform: none;
    }

    /* Second glitch */
    60% {
      text-shadow: none;
      transform: none;
    }
    61% {
      text-shadow:
        2px 0 #ff3c3c,
        -2px 0 #00d2ff;
      transform: skewX(10deg);
    }
    62% {
      text-shadow:
        -2px 0 #ff3c3c,
        2px 0 #00d2ff;
      transform: skewX(-10deg);
    }
    63% {
      text-shadow: none;
      transform: none;
    }

    /* Third glitch (end loop) */
    90% {
      text-shadow: none;
      transform: none;
    }
    91% {
      text-shadow:
        4px 0 #ff3c3c,
        -4px 0 #00d2ff;
      transform: skewX(20deg);
    }
    92% {
      text-shadow:
        -4px 0 #ff3c3c,
        4px 0 #00d2ff;
      transform: skewX(-20deg);
    }
    93% {
      text-shadow: none;
      transform: none;
    }
  }
</style>
