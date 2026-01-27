<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { getLocale } from '$lib/i18n'

  interface Props {
    path?: string
    serverURL: string
    [key: string]: any
  }

  let { path, serverURL, ...others }: Props = $props()

  let sodesu: any = null

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Sodesu = await import('sodesu-comment')
      sodesu = Sodesu.init({
        el: '#sodesu',
        path: path || window.location.pathname,
        serverURL,
        login: 'disable',
        lang: getLocale(),
        dark: 'auto',
      })
    }
  })

  $effect(() => {
    const l = getLocale()
    sodesu?.update({ lang: l })
  })
</script>

<div id="sodesu-wrapper" {...others}>
  <div id="sodesu"></div>
</div>
