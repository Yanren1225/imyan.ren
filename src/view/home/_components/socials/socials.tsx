import { Component, Index, Show } from 'solid-js'
import './socials.less'
import './hover.less'

interface SocialProps {
  icon: string
  link: string
  class?: string
  text?: string
}

const SocialItem: Component<SocialProps> = (props) => {
  return (
    <a class={`link outfit ${props.class}`} href={props.link} target="_blank">
      <div>
        <i class={props.icon} />
      </div>
      <Show when={props.text}>
        <div class="text">{props.text}</div>
      </Show>
    </a>
  )
}

const Socials = () => {
  const socialLists: SocialProps[] = [
    {
      text: 'Github',
      link: 'https://github.com/Yanren1225',
      icon: 'fa-brands fa-github',
    },
    {
      text: 'Blog',
      link: 'https://blog.imyan.ren',
      icon: 'fa-solid fa-blog',
    },
    {
      link: 'https://twitter.com/realYanren',
      icon: 'fab fa-twitter',
      class: 'hover-twitter',
    },
    {
      link: 'mailto:nihaocun@outlook.com',
      icon: 'fa-solid fa-at',
    },
    {
      link: 'https://space.bilibili.com/21696748',
      icon: 'fa-brands fa-bilibili',
      class: 'hover-bilibili',
    },
    {
      link: 'https://t.me/realYanren',
      icon: 'fa-brands fa-telegram',
    },
  ]

  return (
    <div id="socials">
      <Index each={socialLists}>{(item) => <SocialItem {...item()} />}</Index>
    </div>
  )
}

export { Socials }
