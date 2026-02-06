<script lang="ts">
  import { enhance } from '$app/forms'
  import { fly } from 'svelte/transition'
  import {
    Terminal,
    TerminalPrompt,
    HoverCard,
    TerminalCursor,
    modal,
    toast,
  } from '@yanren/common'
  import { formatBytes } from '$lib/utils'
  import { env } from '$env/dynamic/public'
  import type { PageData } from './$types'

  let { data } = $props()
  let isDragging = $state(false)
  let uploadForm: HTMLFormElement
  let fileToDelete = $state('')
  let deleteForm: HTMLFormElement

  async function confirmDelete(key: string) {
    const isConfirmed = await modal.confirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete ${key}? This action cannot be undone.`,
      confirmText: 'Delete',
      type: 'warning',
    })

    if (isConfirmed) {
      fileToDelete = key
      setTimeout(() => {
        deleteForm.requestSubmit()
      }, 0)
    }
  }

  function copyUrl(key: string) {
    const domain = env.PUBLIC_ASSETS_DOMAIN || 'assets.imyan.ren'
    const url = `https://${domain}/${key}`
    navigator.clipboard.writeText(url)
    toast.success('Copied URL to clipboard')
  }
</script>

<svelte:head>
  <title>R2 Dashboard - Yanren</title>
</svelte:head>

<div class="container">
  <div class="terminal-wrapper">
    <Terminal>
      <TerminalPrompt hostname="root@r2.imyan.ren:~$"
        >list bucket --name "{data.bucketName}"</TerminalPrompt
      >
      <div class="command-output">
        Found {data.files.length} files. Total size: {formatBytes(
          data.files.reduce((acc, file) => acc + (file.size || 0), 0),
        )}
      </div>

      <div class="mt-4">
        <TerminalPrompt hostname="root@r2.imyan.ren:~$">
          <form
            action="?/logout"
            method="POST"
            use:enhance
            class="inline-block"
          >
            <button
              class="bg-transparent border-0 p-0 text-[#ef4444] cursor-pointer hover:underline font-inherit"
              >logout</button
            >
          </form>
          <TerminalCursor></TerminalCursor>
        </TerminalPrompt>
      </div>
    </Terminal>
  </div>

  <div class="upload-area">
    <!-- Upload Zone -->
    <div
      role="button"
      tabindex="0"
      aria-label="Upload file drop zone"
      class="upload-zone {isDragging ? 'dragging' : ''}"
      ondragover={(e) => {
        e.preventDefault()
        isDragging = true
      }}
      ondragleave={() => (isDragging = false)}
      ondrop={(e) => {
        e.preventDefault()
        isDragging = false

        if (e.dataTransfer?.files.length) {
          const input = uploadForm.querySelector(
            'input[type="file"]',
          ) as HTMLInputElement
          input.files = e.dataTransfer.files
          uploadForm.requestSubmit()
        }
      }}
    >
      <form
        action="?/upload"
        method="POST"
        enctype="multipart/form-data"
        use:enhance
        bind:this={uploadForm}
        class="upload-form"
      >
        <div class="upload-icon">
          <div class="i-material-symbols-upload text-3xl"></div>
        </div>
        <div class="upload-text">
          <span class="primary">Upload Files</span>
          <span class="secondary">Drag & drop or directly select</span>
        </div>

        <input
          type="file"
          name="file"
          class="hidden"
          id="file-upload"
          onchange={() => uploadForm.requestSubmit()}
        />
        <label for="file-upload" class="file-label-overlay"></label>
      </form>
    </div>
  </div>

  <div class="file-grid">
    {#each data.files as file (file.key)}
      <div in:fly={{ y: 20, duration: 300 }}>
        <HoverCard class="file-card">
          <div class="file-preview">
            {#if /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.key || '')}
              <img
                src={`https://${env.PUBLIC_ASSETS_DOMAIN || 'assets.imyan.ren'}/${file.key}`}
                alt={file.key}
                loading="lazy"
              />
            {:else}
              <div class="file-icon">
                <div class="i-material-symbols-description text-2xl"></div>
              </div>
            {/if}
          </div>

          <div class="file-info">
            <h3 class="file-name" title={file.key}>{file.key}</h3>
            <div class="file-meta">
              <span>{formatBytes(file.size || 0)}</span>
              <span
                >{file.lastModified
                  ? new Date(file.lastModified).toLocaleDateString()
                  : '-'}</span
              >
            </div>
          </div>

          <div class="file-actions">
            <button
              class="action-btn copy"
              onclick={() => copyUrl(file.key || '')}
              title="Copy URL"
            >
              <div class="i-material-symbols-content-copy-outline"></div>
            </button>
            <button
              class="action-btn delete"
              title="Delete"
              onclick={() => confirmDelete(file.key || '')}
            >
              <div class="i-material-symbols-delete-outline text-xl"></div>
            </button>
          </div>
        </HoverCard>
      </div>
    {/each}
  </div>

  {#if data.files.length === 0}
    <div class="empty-state">
      <p>No files in bucket</p>
    </div>
  {/if}

  <form
    action="?/delete"
    method="POST"
    use:enhance
    bind:this={deleteForm}
    class="hidden"
  >
    <input type="hidden" name="key" value={fileToDelete} />
  </form>
</div>

<style>
  .container {
    width: 100%;
    margin: 0 auto;
  }

  .terminal-wrapper {
    margin-bottom: 30px;
  }

  .command-output {
    color: var(--c-text);
    opacity: 0.7;
    padding-left: 20px;
    margin-top: 5px;
  }

  .upload-area {
    margin-bottom: 30px;
  }

  .upload-zone {
    width: 100%;
    border: 2px dashed var(--c-bg-soft);
    border-radius: 0;
    position: relative;
    transition: all 0.2s ease;
    background: color-mix(in srgb, var(--c-neon), transparent 95%);
  }

  .upload-zone:hover,
  .upload-zone.dragging {
    border-color: var(--c-neon);
    background: color-mix(in srgb, var(--c-neon), transparent 90%);
  }

  .upload-form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 100%;
    padding: 30px;
  }

  .upload-icon {
    color: var(--c-neon);
  }

  .upload-text {
    display: flex;
    flex-direction: column;
  }

  .upload-text .primary {
    font-weight: 600;
    color: var(--c-text);
  }

  .upload-text .secondary {
    font-size: 0.85rem;
    color: var(--c-text);
    opacity: 0.6;
  }

  .file-label-overlay {
    position: absolute;
    inset: 0;
    cursor: pointer;
  }

  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  :global(.file-card) {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 16px;
    height: 100%;
  }

  .file-preview {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    background: var(--c-bg-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .file-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-icon {
    color: var(--c-text);
    opacity: 0.5;
  }

  .file-info {
    flex: 1;
    min-width: 0;
  }

  .file-name {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--c-text);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-meta {
    display: flex;
    gap: 12px;
    font-size: 0.8rem;
    color: var(--c-text);
    opacity: 0.6;
    font-family: 'Fira Code', monospace;
  }

  .file-actions {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: var(--c-text);
    opacity: 0.6;
    transition: all 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .action-btn:hover {
    opacity: 1;
    background: var(--c-bg-soft);
    color: var(--c-neon);
  }

  .action-btn.delete:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .empty-state {
    padding: 60px;
    text-align: center;
    color: var(--c-text);
    opacity: 0.5;
    background: var(--c-bg-soft);
    border-radius: 12px;
    border: 1px dashed rgba(255, 255, 255, 0.1);
  }
</style>
