declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any
  export default value
}

declare module '*.md' {
  import type { SvelteComponent } from 'svelte'
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>
}

declare module 'postcss-preset-env'
