import { createAuth } from '@yanren/auth'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'

if (!env.AUTH_SECRET) {
  throw new Error('Auth environment variables are not configured. Missing: AUTH_SECRET')
}

export const { handle } = createAuth({
  secret: env.AUTH_SECRET,
  cookieDomain: env.COOKIE_DOMAIN,
  dev,
})
