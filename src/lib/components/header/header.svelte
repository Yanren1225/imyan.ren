<script lang="ts">
  import { i18n } from '$lib/i18n'
  import { page } from '$app/state'
  import LanguageSwitcher from '../language-switcher/language-switcher.svelte'

  let isScrolled = $state(false)

  const onScroll = () => {
    isScrolled = window.scrollY > 20
  }
</script>

<svelte:window onscroll={onScroll} />

<header class:scrolled={isScrolled}>
  <div class="inner">
    <ul class="nav font-mono">
      <li>
        <a class:active={page.url.pathname === '/'} href="/">
          {i18n.t.nav.home}
        </a>
      </li>
      <li>
        <a
          class:active={page.url.pathname.startsWith('/friend')}
          href="/friend"
        >
          {i18n.t.nav.friend}
        </a>
      </li>
      <li>
        <a class:active={page.url.pathname.startsWith('/about')} href="/about">
          {i18n.t.nav.about}
        </a>
      </li>
      <li>
        <a
          class:active={page.url.pathname.startsWith('/comment')}
          href="/comment"
        >
          {i18n.t.nav.comment}
        </a>
      </li>
      <li>
        <a target="_blank" href="https://www.travellings.cn/go.html">
          {i18n.t.nav.travelling}
        </a>
      </li>
    </ul>
    <LanguageSwitcher />
  </div>
</header>

<style>
  header {
    grid-column: 1 / -1 !important;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.scrolled {
      background-color: color-mix(in srgb, var(--c-bg), transparent 20%);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--c-grid);
    }

    .inner {
      width: min(65rem, calc(100% - 48px));
      margin: 0 auto;
      padding: 20px 0;
      display: flex;
      transition: padding 0.3s;
    }

    &.scrolled .inner {
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
      .inner {
        flex-direction: column-reverse;
        gap: 20px;
      }

      :global(#language-switcher) {
        margin-left: 0;
      }
    }
  }
</style>
