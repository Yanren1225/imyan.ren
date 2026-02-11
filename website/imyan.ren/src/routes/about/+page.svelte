<script lang="ts">
  import { i18n } from '$lib/i18n'
  import AboutEn from './about.en.md'
  import AboutZh from './about.zh.md'
</script>

{#if i18n.locale === 'zh-cn'}
  <AboutZh />
{:else}
  <AboutEn />
{/if}
