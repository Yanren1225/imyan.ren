import { mergeProps, Show } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type LayoutProps = {
  children: JSX.Element
  hasHeader?: boolean
  hasFooter?: boolean
}

const Layout = (props: LayoutProps) => {
  const _props = mergeProps({ hasHeader: true, hasFooter: true }, props)

  return (
    <>
      <Show when={_props.hasHeader}>
        <Header />
      </Show>
      <>{_props.children}</>
      <Show when={_props.hasFooter}>
        <Footer />
      </Show>
    </>
  )
}

export default Layout
