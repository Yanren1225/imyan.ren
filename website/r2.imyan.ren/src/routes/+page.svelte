<script lang="ts">
  import { enhance } from '$app/forms'
  import { fade } from 'svelte/transition'
  import type { PageData, ActionData } from './$types'
  import { formatBytes } from '$lib/utils' // We'll need to create this util or just inline logic
  import { env } from '$env/dynamic/public'

  let { data, form } = $props()

  // Utiltity to format bytes inline since I haven't created $lib/utils yet
  function formatSize(bytes: number | undefined) {
    if (bytes === undefined) return '0 B'
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Copy to clipboard helper
  function copyUrl(key: string) {
    const domain = env.PUBLIC_ASSETS_DOMAIN || 'assets.imyan.ren'
    const url = `https://${domain}/${key}`
    navigator.clipboard.writeText(url)
    alert('Copied: ' + url)
  }

  let isDragging = $state(false)
  let uploadForm: HTMLFormElement
</script>

<div class="min-h-screen bg-gray-900 text-white p-8">
  <header
    class="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg border border-gray-700"
  >
    <div>
      <h1 class="text-2xl font-bold flex items-center gap-2">
        <span class="text-blue-500">R2</span> Dashboard
      </h1>
      <p class="text-sm text-gray-400 mt-1">
        Bucket: <span class="font-mono text-gray-300">{data.bucketName}</span>
      </p>
    </div>
    <form action="?/logout" method="POST" use:enhance>
      <button
        class="px-4 py-2 bg-red-500/10 text-red-500 rounded border border-red-500/50 hover:bg-red-500/20 transition"
        >Logout</button
      >
    </form>
  </header>

  <!-- Upload Zone -->
  <div
    role="button"
    tabindex="0"
    aria-label="Upload file drop zone"
    class="mb-8 border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200
               {isDragging
      ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
      : 'border-gray-700 bg-gray-800 hover:border-gray-600'}"
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
      use:enhance={() => {
        return async ({ update }) => {
          await update()
        }
      }}
      bind:this={uploadForm}
      class="flex flex-col items-center gap-4"
    >
      <div class="p-4 rounded-full bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      <div>
        <p class="text-lg font-medium">Drop files here or click to upload</p>
        <p class="text-sm text-gray-400 mt-1">Supports any file type</p>
      </div>

      <input
        type="file"
        name="file"
        class="hidden"
        id="file-upload"
        onchange={() => uploadForm.requestSubmit()}
      />

      <label
        for="file-upload"
        class="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
      >
        Select File
      </label>
    </form>
  </div>

  <!-- File List -->
  <div
    class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-900/50 border-b border-gray-700">
            <th class="p-4 font-medium text-gray-400 w-16">Preview</th>
            <th class="p-4 font-medium text-gray-400 text-sm md:text-base"
              >Filename</th
            >
            <th class="p-4 font-medium text-gray-400 w-32 hidden md:table-cell"
              >Size</th
            >
            <th class="p-4 font-medium text-gray-400 w-48 hidden md:table-cell"
              >Date</th
            >
            <th class="p-4 font-medium text-gray-400 w-32 text-right"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          {#each data.files as file (file.key)}
            <tr class="hover:bg-gray-700/50 transition bg-transparent group">
              <td class="p-4">
                {#if /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.key || '')}
                  <div
                    class="w-10 h-10 rounded overflow-hidden bg-gray-900 border border-gray-700"
                  >
                    <img
                      src={`https://${env.PUBLIC_ASSETS_DOMAIN || 'assets.imyan.ren'}/${file.key}`}
                      alt={file.key}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                {:else}
                  <div
                    class="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                {/if}
              </td>
              <td
                class="p-4 font-medium group-hover:text-blue-400 transition-colors break-all"
              >
                {file.key}
              </td>
              <td
                class="p-4 text-gray-400 font-mono text-sm hidden md:table-cell"
              >
                {formatSize(file.size)}
              </td>
              <td class="p-4 text-gray-400 text-sm hidden md:table-cell">
                {file.lastModified
                  ? new Date(file.lastModified).toLocaleDateString()
                  : '-'}
              </td>
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => copyUrl(file.key || '')}
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition"
                    title="Copy URL"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  <form action="?/delete" method="POST" use:enhance>
                    <input type="hidden" name="key" value={file.key} />
                    <button
                      class="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded transition"
                      title="Delete"
                      onclick={(e) => {
                        if (
                          !confirm('Are you sure you want to delete this file?')
                        ) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          {/each}

          {#if data.files.length === 0}
            <tr>
              <td colspan="5" class="p-12 text-center text-gray-500">
                <p>No files found in bucket</p>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
