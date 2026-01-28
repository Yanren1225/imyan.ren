<script lang="ts">
  import { t } from '$lib/i18n'
  import { page } from '$app/stores'
  import LanguageSwitcher from '../language-switcher/language-switcher.svelte'

  let isScrolled = $state(false)

  function onScroll() {
    isScrolled = window.scrollY > 20
  }
</script>

<svelte:window onscroll={onScroll} />

<header class:scrolled={isScrolled}>
  <ul class="nav font-mono">
    <li>
      <a class:active={$page.url.pathname === '/'} href="/">
        {t('nav.home')}
      </a>
    </li>
    <li>
      <a class:active={$page.url.pathname.startsWith('/friend')} href="/friend">
        {t('nav.friend')}
      </a>
    </li>
    <li>
      <a class:active={$page.url.pathname.startsWith('/about')} href="/about">
        {t('nav.about')}
      </a>
    </li>
    <li>
      <a
        class:active={$page.url.pathname.startsWith('/comment')}
        href="/comment"
      >
        {t('nav.comment')}
      </a>
    </li>
    <li>
      <a target="_blank" href="https://www.travellings.cn/go.html">
        {t('nav.travelling')}
      </a>
    </li>
  </ul>
  <LanguageSwitcher />
</header>

<style>
  header {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 20px 0;
    margin-bottom: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.scrolled {
      background-color: color-mix(in srgb, var(--c-bg), transparent 20%);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--c-grid);
      padding: 12px 0;
    }

    .nav {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    :global(#language-switcher) {
      margin-left: auto;
    }

    .nav a {
      color: var(--c-text);
      text-decoration: none;
      transition: all 0.3s;

      &.active {
        color: var(--c-text-hover);
        font-weight: bold;
      }

      &:hover {
        color: var(--c-text-hover);
      }
    }

    @media (max-width: 600px) {
      flex-direction: column-reverse;
      gap: 20px;

      :global(#language-switcher) {
        margin-left: 0;
      }
    }
  }
</style>
