import { Index, Show } from 'solid-js'
import style from './socials.module.css'
import './hover.css'

interface SocialProps {
  data: {
    icon: string
    link: string
    class?: string
    text?: string
  }
}

const SocialItem = (props: SocialProps) => {
  const { data } = props
  return (
    <a
      class={`${style.link} outfit ${data.class}`}
      href={data.link}
      target="_blank"
    >
      <div>
        <div class={data.icon} />
      </div>
      <Show when={data.text}>
        <div class={style.text}>{data.text}</div>
      </Show>
    </a>
  )
}

const Socials = () => {
  const socialLists = [
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
      link: 'https://twitter.com/EndureBlaze',
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
      link: 'https://t.me/EndureBlaze',
      icon: 'fa-brands fa-telegram',
    },
  ]

  return (
    <div id={style.socials}>
      <Index each={socialLists}>{(item) => <SocialItem data={item()} />}</Index>
    </div>
  )
}

export { Socials }
