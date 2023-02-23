import { Component, Index, Show } from 'solid-js'
import './socials.less'
import './hover.less'

interface SocialProps {
  icon: string
  link: string
  class?: string
  text?: string
}

const SocialItem: Component<SocialProps> = (props: SocialProps) => {
  return (
    <a class={`link outfit ${props.class}`} href={props.link} target="_blank">
      <div>
        <div class={props.icon} />
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
      link: 'https://github.com/EndureBlaze',
      icon: 'fa-brands fa-github',
    },
    {
      text: 'Blog',
      link: 'https://blog.imyan.ren',
      icon: 'fa-solid fa-blog',
    },
    {
      text: '',
      link: 'https://twitter.com/realYanren',
      icon: 'fab fa-twitter',
      class: 'hover-twitter',
    },
    {
      text: '',
      link: 'mailto:nihaocun@outlook.com',
      icon: 'fa-solid fa-at',
    },
    {
      text: '',
      link: 'https://space.bilibili.com/21696748',
      icon: 'fa-brands fa-bilibili',
      class: 'hover-bilibili',
    },
    {
      text: '',
      link: 'https://t.me/realYanren',
      icon: 'fa-brands fa-telegram',
    },
  ]

  return (
    <div id="socials">
      <Index each={socialLists}>
        {(item) => (
          <SocialItem
            icon={item().icon}
            link={item().link}
            class={item().class}
            text={item().text}
          />
        )}
      </Index>
    </div>
  )
}

export { Socials }
