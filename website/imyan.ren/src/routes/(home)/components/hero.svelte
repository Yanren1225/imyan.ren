<script lang="ts">
  import { i18n } from '$lib/i18n'

  let part1 = $state('')
  let part2 = $state('')
  let part3 = $state('')
  let typing = $state(true)

  const getParts = () => {
    const l = i18n.locale
    const p1 = `${i18n.t.hey},\n${i18n.t.im}${l === 'en' ? ' ' : ''}`
    const p2 = i18n.t.yanren as string
    const p3 = '.'
    return [p1, p2, p3]
  }

  $effect(() => {
    const [p1, p2, p3] = getParts()

    part1 = ''
    part2 = ''
    part3 = ''
    typing = true

    // 用户要求减少动态效果时直接给出完整文案，光标常亮不闪
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      part1 = p1
      part2 = p2
      part3 = p3
      typing = false
      return
    }

    let charIndex = 0
    const totalLength = p1.length + p2.length + p3.length

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
        typing = false
      }
    }, 100)

    return () => clearInterval(interval)
  })
</script>

<div class="font-outfit" id="hero">
  <div class="box">
    <!-- JS 启用时显示打字效果。span 之间不能留空白：pre-line 会把换行渲染成空格，把句号和光标挤开 -->
    <p class="typewriter-text" style="white-space: pre-line">
      <span>{part1}</span><span class="font-bold">{part2}</span><span>{part3}</span><span
        class="caret"
        aria-hidden="true"
      ><span class="caret-bar" class:blink={!typing}></span></span>
    </p>
    <!-- JS 禁用时显示静态内容 -->
    <noscript>
      <p class="static-text" style="white-space: pre-line">
        <span>{i18n.t.hey},</span><br /><span>{i18n.t.im}{i18n.locale === 'en' ? ' ' : ''}</span><span class="font-bold">{i18n.t.yanren}</span><span>.</span>
      </p>
    </noscript>
  </div>
  <div class="info">
    <p>{i18n.t.info[0]}</p>
    <p>{i18n.t.info[1]}</p>
  </div>
</div>

<style>
  #hero {
    margin-top: 4.5rem;

    .info {
      margin-top: 24px;
    }

    .box p {
      font-size: 3rem;
      line-height: 1;
      color: var(--c-text);

      & .font-bold {
        position: relative;
        display: inline-block;
        color: var(--c-text-hover);
      }
    }

    .info p {
      font-size: 1.125rem;
      line-height: 1.75rem;
      margin-top: 0.5rem;
      color: var(--c-text);
    }

    /* JS 禁用时隐藏打字效果版本 */
    @media (scripting: none) {
      .typewriter-text {
        display: none;
      }
    }

    /* noscript 内的静态文本样式继承 */
    :global(noscript .static-text) {
      font-size: 3rem;
      line-height: 1;
      color: var(--c-text);
    }

    :global(noscript .static-text .font-bold) {
      font-weight: bold;
      color: var(--c-text-hover);

      @media (prefers-color-scheme: dark) {
        text-shadow:
          0 0 5px var(--c-neon),
          0 0 15px var(--c-neon),
          0 0 30px var(--c-neon);
      }
    }
  }

  /* 站内主题（html[data-theme]）决定 hero 动效：
     深色走霓虹闪烁，浅色走故障抖动；媒体查询只留给禁用 JS 的 noscript 兜底 */
  :global(html[data-theme='dark']) #hero .font-bold {
    text-shadow:
      0 0 5px var(--c-neon),
      0 0 15px var(--c-neon),
      0 0 30px var(--c-neon);
    animation: neon-flicker 15s linear infinite;
  }

  :global(html[data-theme='light']) #hero .font-bold {
    animation: glitch-anim 4s infinite;
  }

  @keyframes caret-blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  /* 光标用 0 高度的锚点 + 绝对定位竖条：
     不参与行盒计算，打字时不会把文字顶歪，也不会撑高行高 */
  .caret {
    position: relative;
    display: inline-block;
    width: 0.09em;
    height: 0;
    margin-left: 0.12em;
    vertical-align: baseline;
    pointer-events: none;
    user-select: none;
  }

  .caret-bar {
    position: absolute;
    bottom: -0.09em;
    left: 0;
    width: 100%;
    height: 0.82em;
    border-radius: 0.04em;
    background: var(--c-text-hover);

    /* 打字过程中常亮，打完才开始闪，像真实终端 */
    &.blink {
      animation: caret-blink 1.06s step-end infinite;
    }
  }

  :global(html[data-theme='dark']) .caret-bar {
    box-shadow:
      0 0 0.12em var(--c-neon),
      0 0 0.36em rgb(from var(--c-neon) r g b / 0.55);
  }

  @media (prefers-reduced-motion: reduce) {
    .caret-bar {
      animation: none !important;
    }
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
