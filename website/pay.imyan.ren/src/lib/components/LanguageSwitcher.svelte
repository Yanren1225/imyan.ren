<script lang="ts">
  import { i18n } from '$lib/i18n'
  import type { Locale } from '$lib/i18n'

  const languageList: { text: string; lan: Locale }[] = [
    {
      text: 'EN',
      lan: 'en',
    },
    {
      text: '简',
      lan: 'zh-cn',
    },
  ]

  function setLanguage(lan: Locale) {
    i18n.setLocale(lan)
  }

  $effect(() => {
    document.title = i18n.t.payTitle
  })
</script>

<div id="language-switcher">
  <ul class="language-list">
    {#each languageList as item}
      <li>
        <button
          class="outfit"
          class:active={i18n.locale === item.lan}
          onclick={() => setLanguage(item.lan)}
        >
          {item.text}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  #language-switcher > .language-list {
    display: flex;
    align-items: flex-end;
  }

  .language-list > li {
    margin-right: 20px;
  }

  .language-list > li:last-child {
    margin-right: 0;
  }

  .language-list > li > button {
    cursor: pointer;
    color: #6060608e;
    font-size: 1.25rem;
    transition: 0.4s;
    line-height: 1;
    background: none;
    border: none;
    padding: 0;
  }

  .language-list > li > button:hover {
    color: #000000;
  }

  .language-list > li > button.active {
    color: #000000;
  }

  @media screen and (prefers-color-scheme: dark) {
    .language-list > li > button.active {
      color: #fff;
    }

    .language-list > li > button:hover {
      color: #fff;
    }
  }
</style>
