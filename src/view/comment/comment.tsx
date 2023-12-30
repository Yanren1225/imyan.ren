import { Component } from 'solid-js'

import { Waline } from '@/components/waline/waline'
import { locale } from '@/i18n'
import Layout from '@/layout/layout'

export const Comment: Component = () => {
  return (
    <Layout>
      <Waline
        style={{ margin: '40px 0' }}
        serverURL="https://comment.imyan.ren/"
        path="comment"
        lang={locale()}
        dark={true}
      />
    </Layout>
  )
}
