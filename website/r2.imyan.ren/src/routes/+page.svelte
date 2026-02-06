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
  import { invalidateAll } from '$app/navigation'
  import { formatBytes } from '$lib/utils'
  import { env } from '$env/dynamic/public'
  import FileCard from '$lib/components/FileCard.svelte'
  import type { PageData } from './$types'

  let { data } = $props()
  let isDragging = $state(false)
  let uploadForm: HTMLFormElement
  let fileToDelete = $state('')
  let deleteForm: HTMLFormElement

  interface UploadingFile {
    key: string
    size: number
    progress: number
    status: 'uploading' | 'done' | 'error'
  }

  // Simple Set implementation for Svelte 5 reactivity
  class SvelteSet<T> {
    set = $state(new Set<T>())

    add(item: T) {
      this.set = new Set(this.set.add(item))
    }

    delete(item: T) {
      const newSet = new Set(this.set)
      newSet.delete(item)
      this.set = newSet
    }

    has(item: T) {
      return this.set.has(item)
    }
  }

  let uploadingFiles = $state<UploadingFile[]>([])
  let deletingFiles = new SvelteSet<string>()

  function uploadFile(file: File) {
    const tempKey = file.name
    // Add to optimistic UI
    uploadingFiles = [
      ...uploadingFiles,
      { key: tempKey, size: file.size, progress: 0, status: 'uploading' },
    ]

    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        // Update progress
        uploadingFiles = uploadingFiles.map((f) =>
          f.key === tempKey ? { ...f, progress: percentComplete } : f,
        )
      }
    }

    xhr.onload = async () => {
      if (xhr.status === 200) {
        uploadingFiles = uploadingFiles.filter((f) => f.key !== tempKey)
        await invalidateAll()
        toast.success(`Uploaded ${tempKey}`)
      } else {
        uploadingFiles = uploadingFiles.map((f) =>
          f.key === tempKey ? { ...f, status: 'error' } : f,
        )
        toast.error(`Failed to upload ${tempKey}`)
      }
    }

    xhr.onerror = () => {
      uploadingFiles = uploadingFiles.map((f) =>
        f.key === tempKey ? { ...f, status: 'error' } : f,
      )
      toast.error(`Error uploading ${tempKey}`)
    }

    const formData = new FormData()
    formData.append('file', file) // Matches the name='file' in the original form
    xhr.open('POST', '?/upload')
    xhr.send(formData)
  }

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => uploadFile(file))
      input.value = '' // Reset input
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    isDragging = false

    if (e.dataTransfer?.files.length) {
      Array.from(e.dataTransfer.files).forEach((file) => uploadFile(file))
    }
  }

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
      ondrop={handleDrop}
    >
      <form
        action="?/upload"
        method="POST"
        enctype="multipart/form-data"
        bind:this={uploadForm}
        class="upload-form"
        onsubmit={(e) => e.preventDefault()}
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
          multiple
          onchange={handleFileSelect}
        />
        <label for="file-upload" class="file-label-overlay"></label>
      </form>
    </div>
  </div>

  <div class="file-grid">
    <!-- Uploading Files -->
    {#each uploadingFiles as file (file.key)}
      <FileCard {file} isUploading={true} progress={file.progress} />
    {/each}

    <!-- Real Files -->
    {#each data.files as file (file.key)}
      <FileCard
        {file}
        isDeleting={deletingFiles.has(file.key)}
        onCopy={copyUrl}
        onDelete={confirmDelete}
      />
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
    use:enhance={() => {
      deletingFiles.add(fileToDelete)
      return async ({ update }) => {
        await update()
        deletingFiles.delete(fileToDelete)
        toast.success(`Deleted ${fileToDelete}`)
      }
    }}
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
