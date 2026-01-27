<script lang="ts">
  import './friend.css'
  import { onMount } from 'svelte'
  import HoverCard from '$lib/components/hover-card/hover-card.svelte'
  import ScrollReveal from '$lib/components/scroll-reveal/scroll-reveal.svelte'
  import FriendItem from '$lib/components/friend/friend-item/friend-item.svelte'
  import { t } from '$lib/i18n'
  import type { IFriendData } from '$lib/types'

  let friendData: IFriendData[] = $state([])

  onMount(async () => {
    try {
      const res = await fetch('/link.json') // served from static
      friendData = await res.json()
    } catch (e) {
      console.error(e)
    }
  })

  const myInfo = {
    name: '炎忍',
    websiteName: "I'm Yanren",
    link: 'https://imyan.ren',
    avatar: 'https://github.com/yanren1225.png',
    descr: 'nice -20 Game && nice 19 Code',
  }

  function getDescription(key?: string) {
    if (key === 'isAccessDenied') {
      return t('access-denied')
    }
    return t('friend-list')
  }
</script>

<div id="friend">
  <div class="friend-part">
    <p class="friend-desc">{t('my-friend')}</p>

    <HoverCard
      class="my-friend-card"
      enableTopBar={false}
      enableLift={false}
      intensity={0}
      enableLight={false}
    >
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
            <span class="value">{myInfo.link}</span>
          </div>

          <div class="info-item">
            <span class="label">{t('friend_info.avatar')}</span>
            <span class="value url-text">{myInfo.avatar}</span>
          </div>

          <div class="info-item">
            <span class="label">{t('friend_info.description')}</span>
            <span class="value">{myInfo.descr}</span>
          </div>
        </div>
      </div>
    </HoverCard>
  </div>

  {#each friendData as item}
    <div class="friend-part">
      <p class="friend-desc">{getDescription(item.class_desc)}</p>
      <div class="friends-box">
        {#each item.link_list as friend, index}
          <ScrollReveal delay={Math.min(index * 30, 150)}>
            <FriendItem
              {...friend}
              isAccessDenied={item.class_desc === 'isAccessDenied'}
            />
          </ScrollReveal>
        {/each}
      </div>
    </div>
  {/each}
</div>
