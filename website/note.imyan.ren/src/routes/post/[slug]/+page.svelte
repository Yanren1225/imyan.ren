<script lang="ts">
  import type { PageData } from './$types'
  import { Terminal, TerminalPrompt } from '@yanren/common'
  import { i18n } from '$lib/i18n'

  export let data: PageData
</script>

<svelte:head>
  <title>{data.post.title} - {i18n.t.title}</title>
</svelte:head>

<div class="post-container">
  <div class="terminal-header-wrapper">
    <Terminal>
      <TerminalPrompt hostname="root@note.imyan.ren:~$">
        <a href="/" class="cmd-link">cd ~</a>
      </TerminalPrompt>
      <TerminalPrompt hostname="root@note.imyan.ren:~$"
        >cat {data.post.slug}.md</TerminalPrompt
      >
      <div class="file-info">
        <div class="meta-line">
          <span class="meta-label">Title:</span>
          <span class="meta-value">{data.post.title}</span>
        </div>
        <div class="meta-line">
          <span class="meta-label">Date:</span>
          <span class="meta-value"
            >{new Date(data.post.date).toISOString().split('T')[0]}</span
          >
        </div>
        <div class="meta-line">
          <span class="meta-label">Category:</span>
          <a href="/category/{data.post.category}" class="meta-link"
            >{data.post.category}</a
          >
        </div>
        <div class="meta-line separator">---</div>
      </div>
    </Terminal>
  </div>

  <article class="prose">
    {@html data.post.content}
  </article>

  {#if data.post.tags && data.post.tags.length > 0}
    <div class="post-footer">
      <div class="tags">
        {#each data.post.tags as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .post-container {
    width: 100%;
    margin: 0 auto;
  }

  .terminal-header-wrapper {
    margin-bottom: 40px;
  }

  .file-info {
    font-family: 'Fira Code', monospace;
    color: var(--c-text);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-line {
    display: flex;
    gap: 10px;
  }

  .meta-label {
    opacity: 0.6;
    min-width: 80px;
  }

  .meta-value {
    color: var(--c-neon);
  }

  .meta-link {
    color: var(--c-neon);
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  .meta-link:hover {
    text-decoration-style: solid;
  }

  .separator {
    color: var(--c-grid);
    margin-top: 10px;
  }

  .cmd-link {
    color: var(--c-neon);
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  .cmd-link:hover {
    text-decoration-style: solid;
  }

  /* Typography for markdown content */
  .prose {
    color: var(--c-text);
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .prose :global(h2) {
    font-size: 1.8rem;
    margin-top: 2em;
    margin-bottom: 1em;
    color: var(--c-text);
    border-left: 4px solid var(--c-neon);
    padding-left: 15px;
  }

  .prose :global(h3) {
    font-size: 1.4rem;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    color: var(--c-text);
  }

  .prose :global(p) {
    margin-bottom: 1.5em;
  }

  .prose :global(a) {
    color: var(--c-neon);
    border-bottom: 1px dashed var(--c-neon);
  }

  .prose :global(a:hover) {
    border-bottom-style: solid;
  }

  .prose :global(code) {
    background: var(--c-bg-soft);
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.9em;
  }

  .prose :global(pre) {
    background: #1a1a1a;
    padding: 20px;
    overflow-x: auto;
    border: 1px solid var(--c-bg-soft);
    margin-bottom: 2em;
  }

  .prose :global(pre code) {
    background: transparent;
    padding: 0;
    color: #e0e0e0;
  }

  .prose :global(ul),
  .prose :global(ol) {
    margin-bottom: 1.5em;
    padding-left: 20px;
  }

  .prose :global(li) {
    margin-bottom: 0.5em;
    list-style-type: disc;
  }

  .post-footer {
    margin-top: 60px;
    padding-top: 30px;
    border-top: 1px solid var(--c-bg-soft);
  }

  .tags {
    display: flex;
    gap: 10px;
  }

  .tag {
    color: var(--c-text);
    opacity: 0.6;
    font-size: 0.9rem;
  }
</style>
