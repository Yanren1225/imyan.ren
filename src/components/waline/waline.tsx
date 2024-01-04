import Sodesu from 'sodesu-comment'
import { Component, createEffect, JSX, onMount } from 'solid-js'

import { locale } from '@/i18n'

type WalineOptions = Parameters<(typeof Sodesu)['init']>[0] &
  JSX.IntrinsicElements['div']

export const Waline: Component<WalineOptions> = (props) => {
  onMount(() => {
    Sodesu.init({
      el: '#sodesu',
      path: props.path,
      serverURL: props.serverURL,
      login: 'disable',
      lang: locale(),
    })
  })

  createEffect(() => Sodesu.update({ lang: locale() }))

  return (
    <div id="sodesu-wrapper" {...props}>
      <div id="sodesu" />
    </div>
  )
}
