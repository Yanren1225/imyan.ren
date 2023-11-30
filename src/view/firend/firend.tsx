import './firend.less'

import { Component, createResource, For } from 'solid-js'

import Layout from '@/layout/layout'
import { get } from '@/net'

import { FirendItem } from './_components/firend-item/firend-item'

const Firend: Component = () => {
  const [friendData] = createResource(() =>
    get<Array<IFirendData>>('./link.json')
  )

  return (
    <>
      <Layout>
        <div id="firend">
          <For each={friendData()}>
            {(item) => (
              <div class="firend-part">
                <p class="firend-desc">{item.class_desc}</p>
                <div class="firends-box">
                  <For each={item.link_list}>
                    {(friend) => <FirendItem {...friend} />}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>
      </Layout>
    </>
  )
}

export { Firend }
