<script lang="ts" generics="TLocale extends string = string">
  type LanguageItem = {
    text: string
    locale: TLocale
  }

  type I18nLike = {
    locale: TLocale
    setLocale: (locale: TLocale) => void
  }

  interface Props {
    /**
     * The i18n instance, must have `locale` and `setLocale` properties
     */
    i18n: I18nLike
    /**
     * Language list configuration
     */
    languages: LanguageItem[]
    /**
     * Optional callback when locale changes
     */
    onLocaleChange?: (locale: TLocale) => void
    /**
     * Optional function to format the display text
     * Default: just returns the text as-is
     * Example: (text, isActive) => isActive ? `[ ${text} ]` : text
     */
    formatText?: (text: string, isActive: boolean) => string
    /**
     * Custom class for the container
     */
    class?: string
  }

  let {
    i18n,
    languages,
    onLocaleChange,
    formatText = (text: string) => text,
    class: className = '',
  }: Props = $props()

  function setLanguage(locale: TLocale) {
    i18n.setLocale(locale)
    onLocaleChange?.(locale)
  }
</script>

<div id="language-switcher" class={className}>
  <ul class="language-list">
    {#each languages as item}
      <li>
        <button
          type="button"
          class="lang-btn"
          class:active={i18n.locale === item.locale}
          onclick={() => setLanguage(item.locale)}
        >
          {formatText(item.text, i18n.locale === item.locale)}
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
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    color: var(--c-text, #606060);
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.3s ease;
    line-height: 1;
    opacity: 0.6;
  }

  .language-list > li > button:hover {
    opacity: 1;
    color: var(--c-text-hover, currentColor);
    text-shadow: 0 0 5px var(--c-text-hover, transparent);
  }

  .language-list > li > button.active {
    opacity: 1;
    color: var(--c-text-hover, currentColor);
    font-weight: 600;
    text-shadow: 0 0 5px var(--c-text-hover, transparent);
  }
</style>
