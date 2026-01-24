import './friend.css'

import {
  Component,
  createResource,
  createSignal,
  createMemo,
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
import { FriendAvatar } from './_components/friend-avatar/friend-avatar'

export const Friend: Component = () => {
  const [friendData] = createResource(() =>
    get<Array<IFriendData>>('./link.json'),
  )

  const description = (key?: string) => {
    switch (key) {
      case 'isAccessDenied':
        return t('access-denied')
      default:
        return t('friend-list')
    }
  }

  const myInfo = {
    name: '炎忍',
    websiteName: "I'm Yanren",
    link: 'https://imyan.ren',
    avatar: 'https://github.com/yanren1225.png',
    descr: () => 'nice -20 Game && nice 19 Code',
  }

  return (
    <>
      <Layout>
        <div id="friend">
          <div class="friend-part">
            <p class="friend-desc">{t('my-friend')}</p>

            <div class="my-friend-card">
              <div class="meta">
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">{t('friend_info.name')}</span>
                    <span class="value">{myInfo.name}</span>
                  </div>

                  <div class="info-item">
                    <span class="label">{t('friend_info.site-name')}</span>
                    <span class="value">{myInfo.websiteName}</span>
                  </div>

                  <div class="info-item">
                    <span class="label">{t('friend_info.address')}</span>
                    <a
                      class="value link"
                      href={myInfo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {myInfo.link}
                    </a>
                  </div>

                  <div class="info-item">
                    <span class="label">{t('friend_info.avatar')}</span>
                    <span class="value url-text">{myInfo.avatar}</span>
                  </div>

                  <div class="info-item">
                    <span class="label">{t('friend_info.description')}</span>
                    <span class="value">{myInfo.descr()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
