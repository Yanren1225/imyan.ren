import { redirect, type Handle } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const handle: Handle = async ({ event, resolve }) => {
  // Public routes that don't require auth
  if (event.url.pathname === '/login') {
    return await resolve(event)
  }

  const authCookie = event.cookies.get('auth')
  const isAuthenticated = authCookie === env.ADMIN_PASSWORD

  if (!isAuthenticated) {
    throw redirect(303, '/login')
  }

  return await resolve(event)
}
