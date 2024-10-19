import './socials.less'

import { Component, Index, Show } from 'solid-js'

interface SocialProps {
  icon: string
  link: string
  name: string
  class?: string
  hideName?: boolean
}

const SocialItem: Component<SocialProps> = (props) => {
  return (
    <a
      class={`outfit ${props.class} link`}
      classList={{ 'hide-name': props.hideName }}
      href={props.link}
      target="_blank"
    >
      <i class={`icon ${props.icon}`} />
      <div class="text">
        <span>{props.name}</span>
      </div>
      {/* <Show when={!props.hideName}>
        <div class="text">{props.name}</div>
      </Show> */}
    </a>
  )
}

const Socials = () => {
  const socialList: SocialProps[] = [
    {
      name: 'GitHub',
      link: 'https://github.com/Yanren1225',
      icon: 'i-simple-icons-github',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/realYanren',
      icon: 'i-simple-icons-twitter',
      class: '!hover:bg-[#00acee]',
      hideName: true,
    },
    {
      name: 'Mastodon',
      link: 'https://m.cmx.im/@yanren',
      icon: 'i-simple-icons-mastodon',
      class: '!hover:bg-[#5c4de3]',
      hideName: true,
    },
    {
      name: 'Bluesky',
      link: 'https://bsky.app/profile/yanren.bsky.social',
      icon: 'i-simple-icons-bluesky',
      class: '!hover:bg-[#0085ff]',
      hideName: true,
    },
    {
      name: 'Email',
      link: 'mailto:hi@imyan.ren',
      icon: 'i-simple-icons-maildotru',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
      hideName: true,
    },
    {
      name: 'Bilibili',
      link: 'https://space.bilibili.com/21696748',
      icon: 'i-simple-icons-bilibili',
      class: '!hover:bg-[#fb7299]',
      hideName: true,
    },
    {
      name: 'Telegram',
      link: 'https://t.me/realYanren',
      icon: 'i-simple-icons-telegram',
      class: '!hover:bg-[#28a8e9]',
      hideName: true,
    },
    // {
    //   link: 'https://blog.imyan.ren',
    //   icon: 'i-simple-icons-blogger',
    //   class:
    //     '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    // },
  ]

  return (
    <div id="socials">
      <Index each={socialList}>{(item) => <SocialItem {...item()} />}</Index>
    </div>
  )
}

export { Socials }
