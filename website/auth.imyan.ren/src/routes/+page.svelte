<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import { page } from '$app/stores'
  import { HoverCard } from '@yanren/common'

  let callbackUrl = $derived($page.url.searchParams.get('callbackUrl') || '/')
</script>

<div class="h-[calc(100vh-8vh)] w-full flex items-center justify-center">
  <div
    class="border border-[var(--c-border)] bg-[var(--c-card-bg)] backdrop-blur p-8 rounded-lg shadow-2xl max-w-sm w-full relative overflow-hidden"
  >
    <!-- Decorative elements -->
    <div
      class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
    ></div>

    <div class="mb-8 text-center">
      <h1 class="text-2xl font-bold tracking-wider mb-2 text-[var(--c-text)]">
        SYSTEM ACCESS
      </h1>
      <p class="text-xs text-gray-400 uppercase tracking-widest">
        Authentication Required
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <HoverCard
        as="button"
        onclick={() => signIn('github', { callbackUrl })}
        class="group flex items-center justify-center gap-3 p-3 w-full"
      >
        <span
          class="i-simple-icons-github text-xl op-80 group-hover:op-100 transition-opacity"
        ></span>
        <span class="text-sm font-medium">Login via GitHub</span>
      </HoverCard>

      <HoverCard
        as="button"
        onclick={() => signIn('google', { callbackUrl })}
        class="group flex items-center justify-center gap-3 p-3 w-full"
      >
        <span
          class="i-simple-icons-google text-xl op-80 group-hover:op-100 transition-opacity"
        ></span>
        <span class="text-sm font-medium">Login via Google</span>
      </HoverCard>
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
