import '../../../node_modules/@waline/client/dist/waline.css'

import {
  init,
  WalineInitOptions,
  WalineInstance,
  WalineLoginStatus,
} from '@waline/client'
import {
  Component,
  createEffect,
  createMemo,
  JSX,
  onCleanup,
  onMount,
} from 'solid-js'

import { locale } from '@/i18n'

type WalineOptions = Omit<WalineInitOptions, 'el'> & {
  path: string
} & JSX.IntrinsicElements['div']

export const Waline: Component<WalineOptions> = (props) => {
  let walineInstance: WalineInstance | null = null
  let containerRef: HTMLDivElement

  const config = createMemo(() => {
    return {
      ...props,
      dark: 'auto',
      login: 'disable' as WalineLoginStatus,
    }
  })

  onMount(() => {
    walineInstance = init({ ...config(), el: containerRef })
  })

  onCleanup(() => {
    if (walineInstance) {
      walineInstance.destroy()
    }
  })

  createEffect(() => walineInstance?.update({ lang: locale() }))

  // createEffect(() => walineInstance?.update(props))

  return <div ref={containerRef!} />
}
