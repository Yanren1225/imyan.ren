<script lang="ts">
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
      class="outfit link {item.class ||
        ''} inline-flex px-3 py-2 mt-2 mr-2 rounded-none gap-2 text-inherit bg-gray-50 transition-all transition-duration-300 decoration-none hover:text-white dark:bg-gray-50/10 border border-black/5 dark:border-white/10"
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

<style>
  #socials {
    margin-top: 1rem;

    .link {
      /* --at-apply: 'inline-flex px-3 py-2 mt-2 mr-2 rounded-none gap-2 text-inherit bg-gray-50 transition-all transition-duration-300 decoration-none hover:text-white dark:bg-gray-50/10 border border-black/5 dark:border-white/10'; */
      transform: translateY(0);
      will-change: transform, box-shadow;
      position: relative;
      overflow: hidden;
    }

    .link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .icon {
      --at-apply: h-20px w-20px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .link:hover .icon {
      transform: scale(1.1) rotate(5deg);
    }

    .text {
      --at-apply: text-sm ml-1;
    }

    .link.hide-name {
      gap: 0;

      .text {
        display: grid;
        grid-template-columns: 0fr;
        overflow: hidden;
        transition: all 0.3s;
        opacity: 0;

        span {
          min-width: 0;
        }
      }

      &:hover {
        gap: 0.5rem;

        .text {
          grid-template-columns: 1fr;
          opacity: 1;
        }
      }
    }
  }
</style>
