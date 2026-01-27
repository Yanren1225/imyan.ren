<script lang="ts">
  import './language-switcher.css';
  import { getLocale, setLocale, type Locale } from '$lib/i18n';

  const languageList: { text: string; lan: Locale }[] = [
    { text: 'en_US', lan: 'en' },
    { text: 'zh_CN', lan: 'zh-cn' },
  ];

  $effect(() => {
    const l = getLocale();
    if (l === 'en') {
      document.title = "I'm Yanren";
    } else {
      document.title = '我是炎忍';
    }
  });

  function switchLang(l: Locale) {
    setLocale(l);
  }
</script>

<div id="language-switcher">
  <ul class="language-list">
    {#each languageList as item}
      <li>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <p
          class="font-mono clickable"
          class:active={getLocale() === item.lan}
          onclick={() => switchLang(item.lan)}
        >
          {getLocale() === item.lan ? `[ ${item.text} ]` : item.text}
        </p>
      </li>
    {/each}
  </ul>
</div>
