<script lang="ts">
  import { LanguageSwitcher } from '@yanren/common'
  import Payments from '$lib/components/Payments.svelte'
  import { i18n, type Locale } from '$lib/i18n'

  const languages: { text: string; locale: Locale }[] = [
    { text: 'en_US', locale: 'en' },
    { text: 'zh_CN', locale: 'zh-cn' },
  ]

  const formatText = (text: string, isActive: boolean) => {
    return isActive ? `[ ${text} ]` : text
  }
</script>

<div class="page-container">
  <nav class="language-wrapper" aria-label={i18n.t.language}>
    <LanguageSwitcher {i18n} {languages} {formatText} />
  </nav>

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
    gap: clamp(1.5rem, 4vw, 2.5rem);
    align-items: start;
    justify-content: center;
    margin: 0 auto;
    padding: 1.5rem 0 2rem;
  }

  .language-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .header-section {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
  }

  .title {
    font-size: clamp(1.85rem, 5vw, 3rem);
    line-height: 1.15;
    letter-spacing: -0.03em;
    font-weight: 700;
    text-wrap: balance;
    margin: 0;
  }

  .intro {
    max-width: 48rem;
    font-size: clamp(1rem, 2vw, 1.15rem);
    line-height: 1.7;
    margin: 0;
    opacity: 0.9;
  }

  .sub-text {
    max-width: 48rem;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    .page-container {
      min-height: auto;
      padding-top: 0.75rem;
    }

    .language-wrapper {
      justify-content: flex-start;
    }
  }
</style>
