<script lang="ts">
  const { author, hasTravelling } = $props<{
    author: string
    hasTravelling: boolean
  }>()

  const currentYear = new Date().getFullYear()
</script>

<footer>
  <p>
    © 2018 - {currentYear}
    {author}
  </p>
  {#if hasTravelling}
    <a
      href="https://www.travellings.cn/go.html"
      target="_blank"
      rel="noopener noreferrer"
      title="Travellings"
    >
      <img
        src="https://www.travellings.cn/assets/w.png"
        alt="Travellings"
        width="100"
        loading="lazy"
        decoding="async"
      />
    </a>
  {/if}
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
