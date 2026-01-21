import './friend.css'

import {
  Component,
  createResource,
  For,
  Show,
  ErrorBoundary,
  Index,
} from 'solid-js'

import { ScrollReveal } from '@/components/scroll-reveal'
import { t } from '@/i18n'
import Layout from '@/layout/layout'
import { get } from '@/net'

import { FriendItem } from './_components/friend-item/friend-item'

const Friend: Component = () => {
  const [friendData] = createResource(() =>
    get<Array<IFriendData>>('./link.json'),
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
        <div id="friend">
          <For each={friendData()}>
            {(item) => (
              <div class="friend-part">
                <p class="friend-desc">{description(item.class_desc)}</p>
                <div class="friends-box">
                  <Index each={item.link_list}>
                    {(friend, index) => (
                      <ScrollReveal delay={Math.min(index * 30, 150)}>
                        <FriendItem
                          {...friend()}
                          isAccessDenied={item.class_desc === 'isAccessDenied'}
                        />
                      </ScrollReveal>
                    )}
                  </Index>
                </div>
              </div>
            )}
          </For>
        </div>
      </Layout>
    </>
  )
}

export { Friend }
