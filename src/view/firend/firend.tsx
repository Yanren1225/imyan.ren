import './firend.less'

import { Component, createResource, For } from 'solid-js'

import Layout from '@/layout/layout'
import { get } from '@/net'

import { FirendItem } from './_components/firend-item/firend-item'
import { t } from '@/i18n'

const Firend: Component = () => {
  const [friendData] = createResource(() =>
    get<Array<IFirendData>>('./link.json')
  )

  const description = (key?: string) => {
    switch (key) {
      case 'isAccessDenied':
        return t('access-denied')
      default:
        return ''
    }
  }

  return (
    <>
      <Layout>
        <div id="firend">
          <For each={friendData()}>
            {(item) => (
              <div class="firend-part">
                <p class="firend-desc">{description(item.class_desc)}</p>
                <div class="firends-box">
                  <For each={item.link_list}>
                    {(friend) => (
                      <FirendItem
                        {...friend}
                        isAccessDenied={item.class_desc === 'isAccessDenied'}
                      />
                    )}
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
