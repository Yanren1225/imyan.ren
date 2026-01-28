<script lang="ts">
  import { getLocale, setLocale, type Locale } from '$lib/i18n'

  const languageList: { text: string; lan: Locale }[] = [
    { text: 'en_US', lan: 'en' },
    { text: 'zh_CN', lan: 'zh-cn' },
  ]

  $effect(() => {
    const l = getLocale()
    if (l === 'en') {
      document.title = "I'm Yanren"
    } else {
      document.title = '我是炎忍'
    }
  })

  function switchLang(l: Locale) {
    setLocale(l)
  }
</script>

<div id="language-switcher">
  <ul class="language-list">
    {#each languageList as item}
      <li>
        <button
          type="button"
          class="font-mono clickable"
          class:active={getLocale() === item.lan}
          onclick={() => switchLang(item.lan)}
        >
          {getLocale() === item.lan ? `[ ${item.text} ]` : item.text}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  #language-switcher {
    & .language-list {
      display: flex;
      align-items: flex-end;
    }
  }

  .language-list {
    & > li {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }

      & > button {
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        color: var(--c-text);
        font-size: 1rem;
        transition: 0.2s;
        line-height: 1;
        opacity: 0.6;

        &:hover {
          opacity: 1;
          color: var(--c-text-hover);
          text-shadow: 0 0 5px var(--c-text-hover);
        }

        &.active {
          opacity: 1;
          color: var(--c-text-hover);
          font-weight: bold;
          text-shadow: 0 0 5px var(--c-text-hover);
        }
      }
    }
  }
</style>
