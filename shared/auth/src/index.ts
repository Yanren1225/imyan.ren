import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit'

export interface AuthOptions {
  secret: string
  cookieDomain?: string
  dev?: boolean
  providers?: SvelteKitAuthConfig['providers']
  callbacks?: SvelteKitAuthConfig['callbacks']
  pages?: SvelteKitAuthConfig['pages']
}

export function createAuth(options: AuthOptions) {
  const {
    secret,
    cookieDomain,
    dev = false,
    providers = [],
    callbacks = {},
    pages = {},
  } = options
  return SvelteKitAuth({
    providers,
    secret,
    trustHost: true,
    pages,
    callbacks,
    cookies: {
      sessionToken: {
        name: `yanren.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: !dev,
          domain: !dev && cookieDomain ? cookieDomain : undefined,
        },
      },
    },
  })
}

import { redirect, type RequestEvent } from '@sveltejs/kit'

export async function requireAuth(event: RequestEvent) {
  const session = await event.locals.auth()
  if (!session?.user) {
    throw redirect(303, `https://auth.imyan.ren/?callbackUrl=${event.url.href}`)
  }
  return { session }
}
