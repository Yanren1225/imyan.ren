import { sequence } from '@sveltejs/kit/hooks'
import { createAuth, requireAuth } from '@yanren/auth'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'
import type { Handle } from '@sveltejs/kit'

if (!env.AUTH_SECRET) {
  throw new Error('Auth environment variables are not configured. Missing: AUTH_SECRET')
}

const { handle: authHandle } = createAuth({
  secret: env.AUTH_SECRET,
  cookieDomain: env.COOKIE_DOMAIN,
  dev,
})

const authGuard: Handle = async ({ event, resolve }) => {
  // Static assets have no route id and must stay public so the login page can load.
  // Everything with a route (pages and form actions) requires the shared session.
  if (event.route.id !== null) {
    await requireAuth(event)
  }

  return resolve(event)
}

export const handle = sequence(authHandle, authGuard)
