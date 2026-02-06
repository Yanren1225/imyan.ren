import { createAuth } from '@yanren/auth'
import { AUTH_SECRET, COOKIE_DOMAIN } from '$env/static/private'
import { dev } from '$app/environment'

export const { handle } = createAuth({
  secret: AUTH_SECRET,
  cookieDomain: COOKIE_DOMAIN,
  dev,
})
