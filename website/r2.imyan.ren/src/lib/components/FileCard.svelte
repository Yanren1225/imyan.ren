<script lang="ts">
  import { fly } from 'svelte/transition'
  import { HoverCard } from '@yanren/common'
  import { formatBytes } from '$lib/utils'
  import { env } from '$env/dynamic/public'

  interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: any
    isUploading?: boolean
    isDeleting?: boolean
    progress?: number
    onCopy?: (key: string) => void
    onDelete?: (key: string) => void
  }

  const {
    file,
    isUploading = false,
    isDeleting = false,
    progress = 0,
    onCopy = () => {},
    onDelete = () => {},
  }: Props = $props()
</script>

<div in:fly={{ y: 20, duration: 300 }}>
  <HoverCard class="file-card {isUploading ? 'uploading' : ''}">
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
        {#if !isUploading}
          <span
            >{file.lastModified
              ? new Date(file.lastModified).toLocaleDateString()
              : '-'}</span
          >
        {:else}
          <span class="text-(--c-neon)"
            >Uploading... {Math.round(progress)}%</span
          >
        {/if}
      </div>
    </div>

    {#if !isUploading && !isDeleting}
      <div class="file-actions">
        <button
          class="action-btn copy"
          onclick={() => onCopy(file.key || '')}
          title="Copy URL"
          aria-label="Copy URL"
        >
          <div class="i-material-symbols-content-copy-outline"></div>
        </button>
        <button
          class="action-btn delete"
          title="Delete"
          onclick={() => onDelete(file.key || '')}
          aria-label="Delete file"
        >
          <div class="i-material-symbols-delete-outline text-xl"></div>
        </button>
      </div>
    {:else if isUploading}
      <div class="upload-progress">
        <div class="spinner i-material-symbols-progress-activity text-xl"></div>
      </div>
    {:else if isDeleting}
      <div class="delete-progress">
        <div
          class="spinner i-material-symbols-progress-activity text-xl text-red-500"
        ></div>
      </div>
    {/if}

    {#if isUploading}
      <div
        class="progress-bar-bg"
        style="width: {progress}%"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    {/if}
  </HoverCard>
</div>

<style>
  :global(.file-card) {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 16px;
    height: 100%;
    position: relative;
    overflow: hidden;
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
    z-index: 1;
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
    z-index: 1;
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
    z-index: 1;
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

  .upload-progress,
  .delete-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: var(--c-neon);
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .progress-bar-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--c-neon);
    opacity: 0.5;
    transition: width 0.1s linear;
    z-index: 2;
  }

  :global(.file-card.uploading) {
    border-color: rgba(var(--c-neon-rgb), 0.3);
  }
</style>
