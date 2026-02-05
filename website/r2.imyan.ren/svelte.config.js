import adapter from '@sveltejs/adapter-cloudflare'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Routes to be deployed as Cloudflare Functions
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
    }),
  },
}

export default config
