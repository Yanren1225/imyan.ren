<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    children,
    class: className = '',
  }: { children: Snippet; class?: string } = $props()
</script>

<div class="markdown-body {className}">
  {@render children()}
</div>

<style>
  .markdown-body {
    margin: 0 auto;
    padding: 2rem 0;
    color: var(--c-text);
    line-height: 1.7;
    font-size: 1rem;
  }

  /* Headings */
  .markdown-body :global(h1),
  .markdown-body :global(h2),
  .markdown-body :global(h3),
  .markdown-body :global(h4),
  .markdown-body :global(h5),
  .markdown-body :global(h6) {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.3;
    color: var(--c-text);
    position: relative;
  }

  .markdown-body :global(h1:hover::before),
  .markdown-body :global(h2:hover::before),
  .markdown-body :global(h3:hover::before),
  .markdown-body :global(h4:hover::before),
  .markdown-body :global(h5:hover::before),
  .markdown-body :global(h6:hover::before) {
    position: absolute;
    right: 100%;
    padding-right: 0.3em;
    color: var(--c-neon);
    opacity: 0.6;
    content: '#';
  }

  .markdown-body :global(h1) {
    font-size: 2em;
    padding-bottom: 0.3em;
  }

  .markdown-body :global(h2) {
    font-size: 1.5em;
    padding-bottom: 0.3em;
  }

  .markdown-body :global(h3) {
    font-size: 1.25em;
  }

  /* Paragraphs & text */
  .markdown-body :global(p) {
    margin-top: 0;
    margin-bottom: 1em;
  }

  .markdown-body :global(strong) {
    font-weight: 600;
    color: var(--c-neon);
  }

  .markdown-body :global(em) {
    font-style: italic;
  }

  /* Links */
  .markdown-body :global(a) {
    color: var(--c-neon);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .markdown-body :global(a:hover) {
    border-bottom-color: var(--c-neon);
  }

  /* Lists */
  .markdown-body :global(ul),
  .markdown-body :global(ol) {
    margin-top: 0;
    margin-bottom: 1em;
    padding-left: 2em;
  }

  .markdown-body :global(li) {
    margin-bottom: 0.25em;
  }

  .markdown-body :global(li + li) {
    margin-top: 0.25em;
  }

  /* Blockquotes */
  .markdown-body :global(blockquote) {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 3px solid var(--c-neon);
    background: var(--c-card-bg);
    border-radius: 0 4px 4px 0;
    color: var(--c-text);
  }

  .markdown-body :global(blockquote p) {
    margin-bottom: 0;
  }

  /* Code - inline */
  .markdown-body :global(code) {
    padding: 0.2em 0.4em;
    font-size: 0.875em;
    background: var(--c-card-bg);
    border-radius: 4px;
    font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
  }

  /* Code - blocks */
  .markdown-body :global(pre) {
    margin: 1em 0;
    padding: 1em;
    overflow-x: auto;
    background: var(--c-card-bg);
    border: 1px solid var(--c-card-bg-hover);
    border-radius: 6px;
    line-height: 1.5;
  }

  .markdown-body :global(pre code) {
    padding: 0;
    background: none;
    border-radius: 0;
    font-size: 0.875em;
  }

  /* Horizontal rule */
  .markdown-body :global(hr) {
    height: 1px;
    margin: 1.5em 0;
    background-color: var(--c-card-bg-hover);
    border: 0;
  }

  /* Tables */
  .markdown-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }

  .markdown-body :global(th),
  .markdown-body :global(td) {
    padding: 0.5em 1em;
    border: 1px solid var(--c-card-bg-hover);
    text-align: left;
  }

  .markdown-body :global(th) {
    background: var(--c-card-bg);
    font-weight: 600;
  }

  .markdown-body :global(tr:nth-child(even)) {
    background: var(--c-bg-soft);
  }

  /* Images */
  .markdown-body :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
  }

  /* Task lists (GitHub style) */
  .markdown-body :global(ul.contains-task-list) {
    list-style-type: none;
    padding-left: 0;
  }

  .markdown-body :global(input[type='checkbox']) {
    margin-right: 0.5em;
    accent-color: var(--c-neon);
  }

  @media (max-width: 768px) {
    .markdown-body {
      padding: 1.5rem 0;
      font-size: 0.9375rem;
    }
  }
</style>
