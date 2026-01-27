<script lang="ts">
  import './socials.css'

  interface SocialConfig {
    name: string
    link: string
    icon: string
    class?: string
    hideName?: boolean
  }

  const socialList: SocialConfig[] = [
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
  ]
</script>

<div id="socials">
  {#each socialList as item}
    <a
      class="outfit link {item.class || ''}"
      class:hide-name={item.hideName}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="icon {item.icon}"></i>
      <div class="text">
        <span>{item.name}</span>
      </div>
    </a>
  {/each}
</div>
