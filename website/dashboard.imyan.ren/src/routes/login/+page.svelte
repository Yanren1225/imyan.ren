<script lang="ts">
  import type { ActionData } from './$types'

  let { form } = $props()
</script>

<div
  class="flex min-h-screen items-center justify-center bg-gray-900 text-white"
>
  <div
    class="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-xl border border-gray-700"
  >
    <h1 class="mb-6 text-2xl font-bold text-center">Dashboard Login</h1>

    {#if form?.missing}
      <p
        class="mb-4 rounded bg-red-500/20 p-2 text-red-500 text-sm border border-red-500/50"
      >
        Password is required
      </p>
    {/if}

    {#if form?.incorrect}
      <p
        class="mb-4 rounded bg-red-500/20 p-2 text-red-500 text-sm border border-red-500/50"
      >
        Incorrect password
      </p>
    {/if}

    <form method="POST" class="space-y-6">
      <div>
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-400">Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          class="block w-full rounded-md bg-gray-900 p-3 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          placeholder="Enter admin password"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-yanren w-full rounded-md py-3 text-white font-semibold transition-colors hover:bg-opacity-90 active:scale-[0.98] bg-blue-600 hover:bg-blue-500"
      >
        Login
      </button>
    </form>
  </div>
</div>
