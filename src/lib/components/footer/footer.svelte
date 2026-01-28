<script lang="ts">
  import { t } from '$lib/i18n'

  const currentYear = new Date().getFullYear()
</script>

<footer>
  <p>
    © 2018 - {currentYear}
    {t('yanren')}{' '}
  </p>
  <a
    href="https://www.travellings.cn/go.html"
    target="_blank"
    rel="noopener noreferrer"
    title="开往-友链接力"
  >
    <img
      src="https://www.travellings.cn/assets/w.png"
      alt="开往-友链接力"
      width="100"
      loading="lazy"
      decoding="async"
    />
  </a>
</footer>

<style>
  footer {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  footer p {
    opacity: 0.4;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
</style>
