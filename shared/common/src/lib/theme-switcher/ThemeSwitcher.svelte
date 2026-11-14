<script lang="ts">
  import type { Theme, ThemeLabels } from './types'

  interface Props {
    labels?: Partial<ThemeLabels>
    class?: string
  }

  const themes: Theme[] = ['auto', 'light', 'dark']
  const defaultLabels: ThemeLabels = {
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
    change: 'Change theme',
  }

  let { labels = {}, class: className = '' }: Props = $props()
  let theme = $state<Theme>('auto')

  const applyTheme = (nextTheme: Theme) => {
    theme = nextTheme

    if (nextTheme === 'auto') {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = nextTheme
    }
  }

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    applyTheme(themes[(currentIndex + 1) % themes.length])
  }

  const getLabel = (key: keyof ThemeLabels) => labels[key] ?? defaultLabels[key]
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
