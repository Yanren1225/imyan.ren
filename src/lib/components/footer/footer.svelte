<script lang="ts">
  import { i18n } from '$lib/i18n'

  const currentYear = new Date().getFullYear()
</script>

<footer>
  <p>
    © 2018 - {currentYear}
    {i18n.t.yanren}
  </p>
  <a
    href="https://www.travellings.cn/go.html"
    target="_blank"
    rel="noopener noreferrer"
    title={i18n.t.travelling_title}
  >
    <img
      src="https://www.travellings.cn/assets/w.png"
      alt={i18n.t.travelling_title}
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
