<script lang="ts">
  import { i18n } from '$lib/i18n'

  interface Props {
    path?: string
    serverURL: string
    [key: string]: any
  }

  let { path, serverURL, ...others }: Props = $props()

  const elementId = `sodesu-${Math.random().toString(36).slice(2, 9)}`

  $effect(() => {
    const currentLang = i18n.locale
    let instance: any = null
    let active = true

    const init = async () => {
      if (typeof window === 'undefined') return

      const Sodesu = await import('sodesu-comment')
      if (!active) return

      instance = Sodesu.init({
        el: `#${elementId}`,
        path: path || window.location.pathname,
        serverURL,
        login: 'disable',
        lang: currentLang,
        dark: 'auto',
      })
    }

    init()

    return () => {
      active = false
      instance?.destroy()
    }
  })
</script>

<div id="sodesu-wrapper" {...others}>
  <div id={elementId}></div>
</div>
