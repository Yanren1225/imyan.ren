import './socials.less'

import { Component, Index, Show } from 'solid-js'

interface SocialProps {
  icon: string
  link: string
  class?: string
  text?: string
}

const SocialItem: Component<SocialProps> = (props) => {
  return (
    <a class={`outfit ${props.class} link`} href={props.link} target="_blank">
      <i class={`icon ${props.icon}`} />
      <Show when={props.text}>
        <div class="text">{props.text}</div>
      </Show>
    </a>
  )
}

const Socials = () => {
  const socialList: SocialProps[] = [
    {
      text: 'GitHub',
      link: 'https://github.com/Yanren1225',
      icon: 'i-simple-icons-github',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    },
    {
      link: 'https://twitter.com/realYanren',
      icon: 'i-simple-icons-twitter',
      class: '!hover:bg-[#00acee]',
    },
    {
      link: 'mailto:hi@imyan.ren',
      icon: 'i-simple-icons-maildotru',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    },
    {
      link: 'https://space.bilibili.com/21696748',
      icon: 'i-simple-icons-bilibili',
      class: '!hover:bg-[#fb7299]',
    },
    {
      link: 'https://t.me/realYanren',
      icon: 'i-simple-icons-telegram',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    },
    {
      link: 'https://blog.imyan.ren',
      icon: 'i-simple-icons-blogger',
      class:
        '!hover:bg-gray-700 !dark:hover:bg-white !dark:hover:text-gray-900',
    },
  ]

  return (
    <div id="socials">
      <Index each={socialList}>{(item) => <SocialItem {...item()} />}</Index>
    </div>
  )
}

export { Socials }
