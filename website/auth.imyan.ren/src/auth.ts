import { createAuth } from '@yanren/auth'
import GitHub from '@auth/sveltekit/providers/github'
import Google from '@auth/sveltekit/providers/google'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'

const requiredEnv = [
  'AUTH_SECRET',
  'GITHUB_ID',
  'GITHUB_SECRET',
  'GOOGLE_ID',
  'GOOGLE_SECRET',
] as const

const missingEnv = requiredEnv.filter((key) => !env[key])

if (missingEnv.length > 0) {
  throw new Error(`Auth environment variables are not configured. Missing: ${missingEnv.join(', ')}`)
}

const requireEnv = (key: (typeof requiredEnv)[number]) => env[key] as string

const allowedEmails = env.ALLOWED_EMAILS
  ? env.ALLOWED_EMAILS.split(',').map((email: string) => email.trim())
  : []

const isAllowedRedirectHost = (hostname: string) => {
  const cookieDomain = env.COOKIE_DOMAIN?.replace(/^\./, '')

  if (!cookieDomain) return false

  return hostname === cookieDomain || hostname.endsWith(`.${cookieDomain}`)
}

export const { handle, signIn, signOut } = createAuth({
  secret: requireEnv('AUTH_SECRET'),
  cookieDomain: env.COOKIE_DOMAIN,
  dev,
  providers: [
    GitHub({ clientId: requireEnv('GITHUB_ID'), clientSecret: requireEnv('GITHUB_SECRET') }),
    Google({ clientId: requireEnv('GOOGLE_ID'), clientSecret: requireEnv('GOOGLE_SECRET') }),
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
      if (url.startsWith('/')) return `${baseUrl}${url}`

      try {
        const targetUrl = new URL(url)

        if (targetUrl.origin === baseUrl) return url
        if (isAllowedRedirectHost(targetUrl.hostname)) return url
      } catch {
        return baseUrl
      }

      return baseUrl
    },
  },
  pages: {
    signIn: '/',
    error: '/error',
  },
})
