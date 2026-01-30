<script lang="ts">
  const { author, travellingTitle } = $props<{
    author: string;
    travellingTitle: string;
  }>();

  const currentYear = new Date().getFullYear();
</script>

<footer>
  <p>
    © 2018 - {currentYear}
    {author}
  </p>
  <a
    href="https://www.travellings.cn/go.html"
    target="_blank"
    rel="noopener noreferrer"
    title={travellingTitle}
  >
    <img
      src="https://www.travellings.cn/assets/w.png"
      alt={travellingTitle}
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
