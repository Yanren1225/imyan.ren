<script lang="ts">
  import { onMount } from 'svelte'
  import HoverCard from '$lib/components/hover-card/hover-card.svelte'
  import ScrollReveal from '$lib/components/scroll-reveal/scroll-reveal.svelte'
  import FriendItem from '$lib/components/friend/friend-item/friend-item.svelte'
  import { i18n } from '$lib/i18n'
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
    name: 'Yanren',
    websiteName: "I'm Yanren",
    link: 'https://imyan.ren',
    avatar: 'https://github.com/yanren1225.png',
    descr: 'nice -20 Game && nice 19 Code',
  }

  function getDescription(key?: string) {
    if (key === 'isAccessDenied') {
      return i18n.t.access_denied
    }
    return i18n.t.friend_list
  }
</script>

<div id="friend">
  <div class="friend-part">
    <p class="friend-desc">{i18n.t.my_friend}</p>

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
            <span class="label">{i18n.t.friend_info.name}</span>
            <span class="value">{myInfo.name}</span>
          </div>

          <div class="info-item">
            <span class="label">{i18n.t.friend_info.site_name}</span>
            <span class="value">{myInfo.websiteName}</span>
          </div>

          <div class="info-item">
            <span class="label">{i18n.t.friend_info.address}</span>
            <span class="value url-text">{myInfo.link}</span>
          </div>

          <div class="info-item">
            <span class="label">{i18n.t.friend_info.avatar}</span>
            <span class="value url-text">{myInfo.avatar}</span>
          </div>

          <div class="info-item">
            <span class="label">{i18n.t.friend_info.description}</span>
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

<style>
  #friend {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .friends-box {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 20px;

      @media (max-width: 1000px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 600px) {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .friend-part {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .friend-desc {
        font-size: 20px;
        color: var(--c-text);
        font-weight: bold;
      }
    }

    :global(.my-friend-card) {
      padding: 24px;
      align-items: flex-start;
      gap: 20px;

      &::after {
        content: 'USER_PROFILE_v1.0';
        position: absolute;
        top: 5px;
        right: 10px;
        font-family: 'Fira Code', monospace;
        font-size: 10px;
        opacity: 0.3;
        pointer-events: none;
      }

      .meta {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 16px;
      }

      .info-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .info-item {
        display: flex;
        align-items: baseline;
        gap: 16px;
        font-size: 14px;

        @media (max-width: 600px) {
          flex-direction: column;
          gap: 4px;
        }
      }

      .label {
        min-width: 70px;
        color: var(--c-text);
        opacity: 0.5;
        font-weight: 500;
        flex-shrink: 0;
      }

      .value {
        color: var(--c-text);
        opacity: 0.9;
        line-height: 1.5;
      }

      .url-text {
        word-break: break-all;
        opacity: 0.9;
        user-select: all;
      }
    }
  }
</style>
