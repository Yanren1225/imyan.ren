import { mergeProps, ParentComponent, Show } from 'solid-js'

import { Footer } from '@/components/footer'
import { GeekCursor } from '@/components/geek-cursor/geek-cursor'
import { GeekDecorations } from '@/components/geek-decorations/geek-decorations'
import { Header } from '@/components/header'
import { PageTransition } from '@/components/page-transition'

type LayoutProps = {
  hasHeader?: boolean
  hasFooter?: boolean
}

const Layout: ParentComponent<LayoutProps> = (props) => {
  const _props = mergeProps({ hasHeader: true, hasFooter: true }, props)

  return (
    <>
      <GeekCursor />
      <GeekDecorations />
      <Show when={_props.hasHeader}>
        <Header />
      </Show>
      <PageTransition>{_props.children}</PageTransition>
      <Show when={_props.hasFooter}>
        <Footer />
      </Show>
    </>
  )
}

export default Layout
