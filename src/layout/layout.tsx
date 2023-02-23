import { mergeProps, ParentComponent, Show } from 'solid-js'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type LayoutProps = {
  hasHeader?: boolean
  hasFooter?: boolean
}

const Layout: ParentComponent<LayoutProps> = (props) => {
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
