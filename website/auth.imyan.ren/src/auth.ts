import { createAuth } from '@yanren/auth'
import GitHub from '@auth/sveltekit/providers/github'
import Google from '@auth/sveltekit/providers/google'
import {
  AUTH_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  ALLOWED_EMAILS,
  COOKIE_DOMAIN,
} from '$env/static/private'
import { dev } from '$app/environment'

const allowedEmails = ALLOWED_EMAILS
  ? ALLOWED_EMAILS.split(',').map((email) => email.trim())
  : []

export const { handle, signIn, signOut } = createAuth({
  secret: AUTH_SECRET,
  cookieDomain: COOKIE_DOMAIN,
  dev,
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (
        allowedEmails.length > 0 &&
        user.email &&
        !allowedEmails.includes(user.email)
      ) {
        return false // Or throw Error('AccessDenied')
      }
      return true
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      // Allows callback URLs on .imyan.ren subdomains (from env)
      if (
        COOKIE_DOMAIN &&
        (url.endsWith(COOKIE_DOMAIN) || url.includes(`${COOKIE_DOMAIN}/`))
      )
        return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/',
    error: '/error',
  },
})
