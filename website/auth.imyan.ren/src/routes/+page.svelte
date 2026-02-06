<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import { page } from '$app/stores'

  let callbackUrl = $derived($page.url.searchParams.get('callbackUrl') || '/')
</script>

<div
  class="h-screen w-full flex items-center justify-center bg-dark-900 text-white font-mono selection:bg-gray-700 selection:text-white"
>
  <div
    class="border border-dark-600 bg-dark-800/50 backdrop-blur p-8 rounded-lg shadow-2xl max-w-sm w-full relative overflow-hidden"
  >
    <!-- Decorative elements -->
    <div
      class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
    ></div>

    <div class="mb-8 text-center">
      <h1 class="text-2xl font-bold tracking-wider mb-2">SYSTEM ACCESS</h1>
      <p class="text-xs text-gray-400 uppercase tracking-widest">
        Authentication Required
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <button
        onclick={() => signIn('github', { callbackUrl })}
        class="group flex items-center justify-center gap-3 p-3 bg-dark-700 border border-dark-500 rounded hover:bg-dark-600 hover:border-gray-500 transition-all duration-300"
      >
        <span
          class="i-simple-icons-github text-xl op-80 group-hover:op-100 transition-opacity"
        ></span>
        <span class="text-sm font-medium">Login via GitHub</span>
      </button>

      <button
        onclick={() => signIn('google', { callbackUrl })}
        class="group flex items-center justify-center gap-3 p-3 bg-dark-700 border border-dark-500 rounded hover:bg-dark-600 hover:border-gray-500 transition-all duration-300"
      >
        <span
          class="i-simple-icons-google text-xl op-80 group-hover:op-100 transition-opacity"
        ></span>
        <span class="text-sm font-medium">Login via Google</span>
      </button>
    </div>

    <div class="mt-8 text-center">
      <p class="text-[10px] text-gray-600">
        SESSION ID: <span class="font-mono text-gray-500"
          >{Math.random().toString(36).substring(7).toUpperCase()}</span
        >
      </p>
    </div>
  </div>
</div>
