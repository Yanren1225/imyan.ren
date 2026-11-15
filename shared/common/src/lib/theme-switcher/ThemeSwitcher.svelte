<script lang="ts">
  import type { Theme, ThemeLabels } from './types'

  interface Props {
    labels?: Partial<ThemeLabels>
    class?: string
  }

  const THEMES: Theme[] = ['auto', 'light', 'dark']
  const defaultLabels: ThemeLabels = {
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
    change: 'Change theme',
  }

  let { labels = {}, class: className = '' }: Props = $props()
  let theme = $state<Theme>('auto')
  let systemDark = $state(false)

  const paint = (mode: Theme, dark: boolean) => {
    const root = document.documentElement
    root.dataset.themeMode = mode
    root.dataset.theme = mode === 'auto' ? (dark ? 'dark' : 'light') : mode
  }

  const applyTheme = (nextTheme: Theme) => {
    theme = nextTheme

    if (typeof document !== 'undefined') {
      paint(nextTheme, systemDark)
    }
  }

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme)
    applyTheme(THEMES[(currentIndex + 1) % THEMES.length])
  }

  const getLabel = (key: keyof ThemeLabels) => labels[key] ?? defaultLabels[key]

  $effect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark = media.matches
    theme = 'auto'
    paint('auto', media.matches)

    const onSystemChange = () => {
      systemDark = media.matches
      if (theme === 'auto') paint('auto', media.matches)
    }

    media.addEventListener('change', onSystemChange)

    return () => media.removeEventListener('change', onSystemChange)
  })
</script>

<button
  type="button"
  class="theme-switcher {className}"
  onclick={cycleTheme}
  aria-label={`${getLabel('change')}: ${getLabel(theme)}`}
  title={`${getLabel('change')}: ${getLabel(theme)}`}
>
  <span class="command" aria-hidden="true">theme</span>
  <span class="mode">[ {getLabel(theme).toUpperCase()} ]</span>
</button>

<style>
  .theme-switcher {
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border: 0;
    background: transparent;
    color: inherit;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.75rem;
    line-height: 1.25rem;
    min-height: 2.75rem;
    opacity: 0.5;
    cursor: pointer;
    transition: color 0.2s, opacity 0.2s, text-shadow 0.2s;
  }

  .theme-switcher:hover,
  .theme-switcher:focus-visible {
    color: var(--c-text-hover);
    opacity: 1;
    text-shadow: 0 0 5px var(--c-text-hover);
  }

  .theme-switcher:focus-visible {
    outline: 1px dashed var(--c-text-hover);
    outline-offset: 3px;
  }

  .theme-switcher:active {
    transform: none;
  }

  .command {
    opacity: 0.7;
  }

  .mode {
    color: var(--c-text-hover);
    font-weight: 600;
  }
</style>
