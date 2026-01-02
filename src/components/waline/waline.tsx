import * as Sodesu from 'sodesu-comment'
import { Component, createEffect, createSignal, JSX, onMount } from 'solid-js'

import { locale } from '@/i18n'

type WalineOptions = Parameters<(typeof Sodesu)['init']>[0] &
  JSX.IntrinsicElements['div']

export const Waline: Component<WalineOptions> = (props) => {
  const [sodesu, setSodesu] = createSignal<ReturnType<
    typeof Sodesu.init
  > | null>(null)

  onMount(() => {
    setSodesu(
      Sodesu.init({
        el: '#sodesu',
        path: props.path,
        serverURL: props.serverURL,
        login: 'disable',
        lang: locale(),
        dark: 'auto',
      })
    )
  })

  createEffect(() => sodesu()?.update({ lang: locale() }))

  return (
    <div id="sodesu-wrapper" {...props}>
      <div id="sodesu" />
    </div>
  )
}
