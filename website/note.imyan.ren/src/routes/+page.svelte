<script lang="ts">
  import type { PageData } from './$types'
  import { HoverCard, Terminal, TerminalPrompt } from '@yanren/common'
  import { i18n } from '$lib/i18n'

  export let data: PageData
</script>

<svelte:head>
  <title>{i18n.t.title}</title>
</svelte:head>

<div class="container">
  <div class="layout">
    <!-- Main Content -->
    <main class="main-content">
      <div class="terminal-header-wrapper">
        <Terminal>
          <TerminalPrompt hostname="root@note.imyan.ren:~$"
            >{i18n.t.list_notes_recent}</TerminalPrompt
          >
          <div class="command-output">
            {i18n.t.found_notes.replace('{count}', String(data.posts.length))}
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
                <span class="category-tag">{post.category}</span>
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
          <p class="empty-state">{i18n.t.no_notes}</p>
        {/if}
      </div>
    </main>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sticky-container">
        <Terminal>
          <TerminalPrompt hostname="root@note.imyan.ren:~$"
            >{i18n.t.tree_categories}</TerminalPrompt
          >

          <div class="tree-container">
            <div class="tree-root">.</div>
            <ul class="tree-list">
              {#each data.categories as category, i}
                <li>
                  <div class="tree-item">
                    <span class="tree-prefix"
                      >{i === data.categories.length - 1 ? '└──' : '├──'}</span
                    >
                    <a href="/category/{category.name}" class="category-link">
                      {category.name}/
                    </a>
                    <span class="tree-count">[{category.count}]</span>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </Terminal>
      </div>
    </aside>
  </div>
</div>

<style>
  .container {
    width: 100%;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  @media (min-width: 768px) {
    .layout {
      flex-direction: row;
    }
  }

  .main-content {
    flex: 1;
  }

  .terminal-header-wrapper {
    margin-bottom: 30px;
  }

  .command-output {
    color: var(--c-text);
    opacity: 0.7;
    padding-left: 20px;
    margin-top: 5px;
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
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    transition: color 0.2s;
  }

  .post-meta {
    font-size: 0.85rem;
    color: var(--c-text);
    opacity: 0.7;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .category-tag {
    background: var(--c-bg-soft);
    padding: 2px 8px;
    font-family: monospace;
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

  .sidebar {
    width: 100%;
  }

  @media (min-width: 768px) {
    .sidebar {
      width: 300px;
      flex-shrink: 0;
    }
  }

  .sticky-container {
    position: sticky;
    top: 40px;
  }

  .tree-container {
    padding-left: 20px;
    margin-top: 5px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .tree-root {
    color: var(--c-text);
    opacity: 0.7;
    margin-bottom: 5px;
  }

  .tree-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tree-item {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .tree-prefix {
    color: var(--c-text);
    opacity: 0.5;
  }

  .category-link {
    color: var(--c-neon);
    text-decoration: underline;
    text-decoration-style: dashed;
    transition: all 0.2s;
  }

  .category-link:hover {
    text-decoration-style: solid;
  }

  .tree-count {
    color: var(--c-text);
    opacity: 0.4;
    font-size: 0.8rem;
  }
</style>
