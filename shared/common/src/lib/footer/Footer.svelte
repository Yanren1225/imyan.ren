<script lang="ts">
  const { author, hasTravelling = false } = $props<{
    author: string
    hasTravelling: boolean
  }>()

  const currentYear = new Date().getFullYear()

  const sites = [
    { name: 'Home', url: 'https://imyan.ren' },
    { name: 'Pay', url: 'https://pay.imyan.ren' },
    { name: 'Note', url: 'https://note.imyan.ren' },
  ]
</script>

<footer>
  <p>
    © 2018 - {currentYear}
    {author}
  </p>
  <div class="links">
    {#each sites as site}
      <a href={site.url} class="nav-link" target="_blank">
        {site.name}
      </a>
    {/each}
    {#if hasTravelling}
      <a
        href="https://www.travellings.cn/go.html"
        target="_blank"
        rel="noopener noreferrer"
        title="Travellings"
        class="travelling-link"
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
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  footer p {
    opacity: 0.4;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .nav-link {
    opacity: 0.4;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s;
  }

  .nav-link:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .travelling-link {
    display: inline-flex;
    align-items: center;
  }
</style>
