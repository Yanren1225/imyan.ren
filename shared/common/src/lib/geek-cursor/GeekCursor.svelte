<script lang="ts">
  import { onMount } from 'svelte'
  import { Spring } from 'svelte/motion'

  interface Point {
    x: number
    y: number
  }

  type StyledElement = HTMLElement | SVGElement

  const INTERACTIVE =
    'a, button, [role="button"], input, textarea, select, summary, label, [contenteditable="true"], .clickable'
  const BLOCKED =
    '[aria-disabled="true"], [disabled], .is-denied, [data-cursor="blocked"]'
  const HANDLED_CURSORS = new Set([
    'auto',
    'default',
    'pointer',
    'text',
    'none',
    'not-allowed',
    'inherit',
    'initial',
    'unset',
    '',
  ])
  const TEXT_INPUT_TYPES = new Set([
    'text',
    'search',
    'email',
    'url',
    'tel',
    'password',
    'number',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
  ])
  const OFFSCREEN: Point = { x: -100, y: -100 }

  let visible = $state(false)
  let hovering = $state(false)
  let blocked = $state(false)
  let textMode = $state(false)
  let usingNative = $state(false)
  let pressing = $state(false)
  let reducedMotion = $state(false)
  let hoverSize = $state(34)
  let dot = $state<Point>({ ...OFFSCREEN })

  let lastPoint: Point = { ...OFFSCREEN }
  let lastTarget: EventTarget | null = null
  let hideTarget: StyledElement | null = null
  let hoverFrame = 0
  let pointerWorking = false

  // 圆点精确跟随；描边拖尾更紧一些，hover 时不至于“追不上”
  const trail = new Spring<Point>({ ...OFFSCREEN }, {
    stiffness: 0.8,
    damping: 0.9,
  })

  const showAt = (x: number, y: number, instant: boolean) => {
    const point = { x, y }

    dot = point
    lastPoint = point
    if (instant) {
      void trail.set(point, { instant: true })
    } else {
      trail.target = point
    }
    visible = true
  }

  const clearHideNative = () => {
    if (hideTarget) {
      hideTarget.classList.remove('geek-hide-native')
      hideTarget = null
    }
  }

  // 只对“作者声明了 pointer/text/not-allowed”的元素补一层强制隐藏，
  // 不碰 resize / zoom / grab 这类原生语义
  const hideNativeOn = (element: Element) => {
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
      return
    }
    if (hideTarget === element) return

    clearHideNative()
    hideTarget = element
    element.classList.add('geek-hide-native')
  }

  const isTextControl = (element: Element) => {
    if (element.closest('textarea')) return true
    if (element.closest('[contenteditable="true"]')) return true

    const input = element.closest('input')
    return input instanceof HTMLInputElement && TEXT_INPUT_TYPES.has(input.type)
  }

  const isSelectableTextAt = (x: number, y: number) => {
    const doc = document as Document & {
      caretRangeFromPoint?: (x: number, y: number) => Range | null
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null
    }

    let node: Node | null = null

    try {
      if (typeof doc.caretRangeFromPoint === 'function') {
        node = doc.caretRangeFromPoint(x, y)?.startContainer ?? null
      } else if (typeof doc.caretPositionFromPoint === 'function') {
        node = doc.caretPositionFromPoint(x, y)?.offsetNode ?? null
      }
    } catch {
      return false
    }

    if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) {
      return false
    }

    // 只在该文本节点真实的字形框内才算“文字上”，避免空白处也显示 I-beam
    const range = document.createRange()
    range.selectNodeContents(node)

    let inside = false
    for (const rect of Array.from(range.getClientRects())) {
      if (
        x >= rect.left - 2 &&
        x <= rect.right + 2 &&
        y >= rect.top - 2 &&
        y <= rect.bottom + 2
      ) {
        inside = true
        break
      }
    }

    if (!inside) return false

    const parent = node.parentElement
    if (!parent) return false

    const style = getComputedStyle(parent)
    const select =
      style.getPropertyValue('user-select') ||
      style.getPropertyValue('-webkit-user-select')

    return select !== 'none'
  }

  const updatePointerState = (
    target: EventTarget | null,
    x: number,
    y: number,
  ) => {
    if (!(target instanceof Element)) {
      hovering = false
      blocked = false
      textMode = false
      usingNative = false
      clearHideNative()
      return
    }

    // 先撤掉上一次动态隐藏，才能读到元素真正的 cursor 语义
    clearHideNative()

    const computed = getComputedStyle(target).cursor
    const isBlocked =
      Boolean(target.closest(BLOCKED)) || computed === 'not-allowed'

    if (isBlocked) {
      if (computed === 'not-allowed') hideNativeOn(target)

      blocked = true
      hovering = false
      textMode = false
      usingNative = false
      return
    }

    if (isTextControl(target)) {
      blocked = false
      hovering = false
      textMode = true
      usingNative = false
      return
    }

    if (!HANDLED_CURSORS.has(computed)) {
      blocked = false
      hovering = false
      textMode = false
      usingNative = true
      return
    }

    blocked = false
    usingNative = false

    const interactive =
      target.closest(INTERACTIVE) || (computed === 'pointer' ? target : null)

    if (interactive) {
      if (computed === 'pointer') hideNativeOn(target)

      hovering = true
      textMode = false

      const rect = interactive.getBoundingClientRect()
      const shortSide = Math.min(rect.width, rect.height)
      hoverSize = Math.max(26, Math.min(36, shortSide + 10))
      return
    }

    hovering = false
    const isText = computed === 'text' || isSelectableTextAt(x, y)
    textMode = isText

    if (isText && computed === 'text') {
      hideNativeOn(target)
    } else if (!isText && (computed === 'auto' || computed === 'default')) {
      hideNativeOn(target)
    }
  }

  // 滚动/缩放后指针下的内容可能已经变了
  const refreshPointerState = () => {
    if (!visible || hoverFrame) return

    hoverFrame = requestAnimationFrame(() => {
      hoverFrame = 0
      if (!visible) return

      const target = document.elementFromPoint(lastPoint.x, lastPoint.y)
      lastTarget = target
      updatePointerState(target, lastPoint.x, lastPoint.y)
    })
  }

  const handleMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
      visible = false
      usingNative = false
      clearHideNative()
      return
    }

    pointerWorking = true

    // 首次出现（或减少动态效果时）直接定位，避免从左上角飞入
    showAt(event.clientX, event.clientY, !visible || reducedMotion)

    if (event.target !== lastTarget) {
      lastTarget = event.target
      updatePointerState(event.target, event.clientX, event.clientY)
    }
  }

  const handleOver = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      showAt(event.clientX, event.clientY, !visible || reducedMotion)
    }

    lastTarget = event.target
    updatePointerState(event.target, event.clientX, event.clientY)
  }

  // 某些嵌入式浏览器/合成事件只派发 mouse 事件，补一层兜底
  const handleMouseMove = (event: MouseEvent) => {
    if (pointerWorking) return

    showAt(event.clientX, event.clientY, !visible || reducedMotion)

    if (event.target !== lastTarget) {
      lastTarget = event.target
      updatePointerState(event.target, event.clientX, event.clientY)
    }
  }

  const handleMouseOver = (event: MouseEvent) => {
    if (pointerWorking) return
    handleMouseMove(event)
  }

  const handleDown = (event: MouseEvent | PointerEvent) => {
    pressing = true
    lastTarget = event.target
    updatePointerState(event.target, event.clientX, event.clientY)
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (pointerWorking || pressing) return
    handleDown(event)
  }

  const handleMouseUp = () => {
    if (pointerWorking) return
    pressing = false
  }

  const hide = () => {
    visible = false
    hovering = false
    blocked = false
    textMode = false
    usingNative = false
    pressing = false
    lastTarget = null
    clearHideNative()

    if (hoverFrame) {
      cancelAnimationFrame(hoverFrame)
      hoverFrame = 0
    }
  }

  const handleVisibilityChange = () => {
    if (document.hidden) hide()
  }

  onMount(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion = media.matches

    const onChange = () => {
      reducedMotion = media.matches
    }

    media.addEventListener('change', onChange)

    return () => {
      media.removeEventListener('change', onChange)
      if (hoverFrame) cancelAnimationFrame(hoverFrame)
      clearHideNative()
    }
  })
</script>

<svelte:window
  onpointermove={handleMove}
  onpointerdown={handleDown}
  onpointerup={() => (pressing = false)}
  onpointercancel={hide}
  onpointerover={handleOver}
  onmousemove={handleMouseMove}
  onmouseover={handleMouseOver}
  onmousedown={handleMouseDown}
  onmouseup={handleMouseUp}
  onscroll={refreshPointerState}
  onresize={refreshPointerState}
/>

<svelte:document onmouseleave={hide} onvisibilitychange={handleVisibilityChange} />

<svelte:head>
  {#if visible}
    <style>
      @media (hover: hover) and (pointer: fine) {
        html,
        body {
          cursor: none;
        }

        /* 只压掉这些元素的 UA 光标；作者声明的 cursor 仍可被读到并处理 */
        a,
        button,
        input,
        textarea,
        select,
        summary,
        label,
        [role='button'],
        [role='link'],
        [role='menuitem'],
        [contenteditable='true'],
        .clickable {
          cursor: none;
        }

        /* 作者声明了 pointer / text / not-allowed / auto 时，下一层强制隐藏 */
        .geek-hide-native,
        .geek-hide-native * {
          cursor: none !important;
        }
      }
    </style>
  {/if}
</svelte:head>

{#if visible && !usingNative}
  <div
    class="cursor-axis axis-x"
    class:hovering
    class:text={textMode}
    class:blocked
    aria-hidden="true"
    style:transform="translate3d({dot.x}px, {dot.y}px, 0)"
  ></div>
  <div
    class="cursor-axis axis-y"
    class:hovering
    class:text={textMode}
    class:blocked
    aria-hidden="true"
    style:transform="translate3d({dot.x}px, {dot.y}px, 0)"
  ></div>
  <div
    class="cursor-ring"
    class:hovering
    class:blocked
    class:pressing
    class:hidden={textMode}
    aria-hidden="true"
    style="transform: translate3d({trail.current
      .x}px, {trail.current.y}px, 0) translate(-50%, -50%); --hover-size: {hoverSize}px"
  ></div>
  <div
    class="cursor-dot"
    class:blocked
    class:hidden={textMode}
    aria-hidden="true"
    style:transform="translate3d({dot.x}px, {dot.y}px, 0) translate(-50%, -50%)"
  ></div>
  <div
    class="cursor-text"
    class:visible={textMode}
    aria-hidden="true"
    style:transform="translate3d({dot.x}px, {dot.y}px, 0) translate(-50%, -50%)"
  ></div>
{/if}

<style>
  .cursor-dot,
  .cursor-ring,
  .cursor-text,
  .cursor-axis {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10000;
    will-change: transform;
  }

  .cursor-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--c-text-hover);
    transition: opacity 0.12s ease;
  }

  .cursor-dot.hidden {
    opacity: 0;
  }

  .cursor-dot.blocked {
    background: #ff3c3c;
  }

  /* 默认就是小方框；悬停可交互元素时按目标尺寸放大 */
  .cursor-ring {
    width: 18px;
    height: 18px;
    border: 1px solid color-mix(in srgb, var(--c-text-hover) 60%, transparent);
    border-radius: 2px;
    background: transparent;
    transition:
      width 0.16s ease,
      height 0.16s ease,
      border-color 0.16s ease,
      background-color 0.16s ease,
      opacity 0.12s ease;
  }

  .cursor-ring.hidden {
    opacity: 0;
  }

  .cursor-ring.hovering {
    width: var(--hover-size, 34px);
    height: var(--hover-size, 34px);
    border-color: var(--c-text-hover);
    background: color-mix(in srgb, var(--c-text-hover) 8%, transparent);
  }

  .cursor-ring.hovering.pressing {
    width: calc(var(--hover-size, 34px) * 0.42);
    height: calc(var(--hover-size, 34px) * 0.42);
    background: color-mix(in srgb, var(--c-text-hover) 18%, transparent);
    transition: none;
  }

  /* 空白处按下也只用边框回缩反馈，不额外画脉冲 */
  .cursor-ring.pressing {
    width: 12px;
    height: 12px;
    transition: none;
  }

  /* 禁用项（如 Signal Lost 友链）：红色方框 + 斜杠，替代 hover 放大 */
  .cursor-ring.blocked {
    width: 30px;
    height: 30px;
    border-color: #ff3c3c;
    background: rgb(255 60 60 / 0.08);
  }

  .cursor-ring.blocked::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top right,
      transparent calc(50% - 0.5px),
      #ff3c3c calc(50% - 0.5px),
      #ff3c3c calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    );
  }

  /* 可选中文字/输入框：细竖条，替代方框 */
  .cursor-text {
    width: 2px;
    height: 20px;
    border-radius: 1px;
    background: var(--c-text-hover);
    opacity: 0;
    transition: opacity 0.12s ease;
  }

  .cursor-text.visible {
    opacity: 1;
  }

  .cursor-axis {
    color: var(--c-text-hover);
    opacity: 0.08;
    transition:
      opacity 0.15s ease,
      color 0.15s ease;
  }

  .axis-x {
    left: -100vw;
    width: 200vw;
    height: 1px;
    background: linear-gradient(90deg, transparent, currentColor 50%, transparent);
  }

  .axis-y {
    top: -100vh;
    width: 1px;
    height: 200vh;
    background: linear-gradient(
      180deg,
      transparent,
      currentColor 50%,
      transparent
    );
  }

  .cursor-axis.hovering {
    opacity: 0.04;
  }

  .cursor-axis.text {
    opacity: 0.05;
  }

  .cursor-axis.blocked {
    color: #ff3c3c;
    opacity: 0.1;
  }

  /* 对比自保：浅色加暗色 keyline，深色加亮色 keyline */
  :global(html[data-theme='light']) .cursor-ring,
  :global(html[data-theme='light']) .cursor-dot,
  :global(html[data-theme='light']) .cursor-text {
    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.24);
  }

  :global(html[data-theme='dark']) .cursor-ring {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 10px color-mix(in srgb, var(--c-text-hover) 18%, transparent);
  }

  :global(html[data-theme='dark']) .cursor-ring.hovering {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 16px color-mix(in srgb, var(--c-text-hover) 28%, transparent);
  }

  :global(html[data-theme='dark']) .cursor-dot {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 8px var(--c-text-hover);
  }

  :global(html[data-theme='dark']) .cursor-text {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 8px var(--c-text-hover);
  }

  :global(html[data-theme='dark']) .cursor-ring.blocked {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 14px rgb(255 60 60 / 0.25);
  }

  :global(html[data-theme='dark']) .cursor-dot.blocked {
    box-shadow:
      0 0 0 1px rgb(255 255 255 / 0.22),
      0 0 8px #ff3c3c;
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor-ring,
    .cursor-dot,
    .cursor-text,
    .cursor-axis {
      transition: none;
    }
  }
</style>
