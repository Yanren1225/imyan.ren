<script lang="ts">
  import { LanguageSwitcher } from '@yanren/common'
  import Payments from '$lib/components/Payments.svelte'
  import { i18n, type Locale } from '$lib/i18n'

  const languages: { text: string; locale: Locale }[] = [
    { text: 'en_US', locale: 'en' },
    { text: 'zh_CN', locale: 'zh-cn' },
  ]

  function formatText(text: string, isActive: boolean) {
    return isActive ? `[ ${text} ]` : text
  }

  $effect(() => {
    document.title = i18n.t.payTitle
  })
</script>

<div class="page-container">
  <div class="language-wrapper">
    <LanguageSwitcher {i18n} {languages} {formatText} />
  </div>

  <div class="header-section">
    <h1 class="title">{i18n.t.payTitle}</h1>
    <p class="intro">{i18n.t.introText}</p>
    <p class="sub-text">{i18n.t.subText}</p>
  </div>

  <Payments />
</div>

<style>
  .page-container {
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: start;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .language-wrapper {
    top: 2rem;
    left: 2rem;
  }

  .header-section {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  .intro {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }

  .sub-text {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.7;
  }
</style>
