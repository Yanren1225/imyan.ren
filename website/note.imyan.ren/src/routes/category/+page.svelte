<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>All Categories - Note</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="text-sm breadcrumbs mb-4">
    <ul>
      <li><a href="/">Home</a></li>
      <li>Categories</li>
    </ul>
  </div>

  <h1 class="text-3xl font-bold mb-8">All Categories</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each data.categories as category}
      <a
        href="/category/{category.name}"
        class="card bg-base-100 shadow hover:shadow-lg transition-shadow border border-base-200"
      >
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h2 class="card-title text-lg">{category.name}</h2>
            <span class="badge badge-primary">{category.count}</span>
          </div>
        </div>
      </a>
    {/each}

    {#if data.categories.length === 0}
      <p>No categories found.</p>
    {/if}
  </div>
</div>
