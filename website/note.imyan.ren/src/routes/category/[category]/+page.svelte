<script lang="ts">
  import type { PageData } from './$types'
  import { HoverCard, Terminal, TerminalPrompt } from '@yanren/common'
  import { i18n } from '$lib/i18n'

  export let data: PageData
</script>

<svelte:head>
  <title>{data.category} - {i18n.t.title}</title>
</svelte:head>

<div class="container">
  <div class="terminal-header-wrapper">
    <Terminal>
      <TerminalPrompt hostname="root@note.imyan.ren:~$">
        <a href="/" class="cmd-link">cd ~</a>
      </TerminalPrompt>
      <TerminalPrompt hostname="root@note.imyan.ren:~$"
        >list-notes --category={data.category}</TerminalPrompt
      >
      <div class="command-output">
        {i18n.t.found_notes_category
          .replace('{count}', String(data.posts.length))
          .replace('{category}', data.category)}
      </div>
    </Terminal>
  </div>

  <div class="post-grid">
    {#each data.posts as post}
      <HoverCard as="article" class="post-card">
        <a href="/post/{post.slug}" class="post-link">
          <h2 class="post-title">{post.title}</h2>
          <div class="post-meta">
            <time datetime={post.date}
              >{new Date(post.date).toLocaleDateString()}</time
            >
          </div>
          {#if post.excerpt}
            <p class="post-excerpt">{post.excerpt}</p>
          {/if}
          <div class="post-tags">
            {#each post.tags as tag}
              <span class="tag">#{tag}</span>
            {/each}
          </div>
        </a>
      </HoverCard>
    {/each}

    {#if data.posts.length === 0}
      <p class="empty-state">{i18n.t.no_notes_category}</p>
    {/if}
  </div>
</div>

<style>
  .container {
    width: 100%;
  }

  .terminal-header-wrapper {
    margin-bottom: 40px;
  }

  .command-output {
    color: var(--c-text);
    opacity: 0.7;
    padding-left: 20px;
    margin-top: 5px;
  }

  .cmd-link {
    color: var(--c-neon);
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  .cmd-link:hover {
    text-decoration-style: solid;
  }

  .post-grid {
    display: grid;
    gap: 20px;
  }

  /* .post-card styles handled by HoverCard */

  .post-link {
    display: block;
    padding: 24px;
    color: var(--c-text);
  }

  .post-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    transition: color 0.2s;
  }

  .post-meta {
    font-size: 0.85rem;
    color: var(--c-text);
    opacity: 0.7;
    margin-bottom: 12px;
  }

  .post-excerpt {
    margin-bottom: 16px;
    opacity: 0.9;
    line-height: 1.6;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    font-size: 0.8rem;
    color: var(--c-neon);
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: var(--c-text);
    opacity: 0.5;
  }
</style>
