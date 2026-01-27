<script lang="ts">
  import './header.css';
  import { t } from '$lib/i18n';
  import { page } from '$app/stores';
  import LanguageSwitcher from '../language-switcher/language-switcher.svelte';

  let isScrolled = $state(false);

  function onScroll() {
    isScrolled = window.scrollY > 20;
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
      <a class:active={$page.url.pathname.startsWith('/comment')} href="/comment">
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
