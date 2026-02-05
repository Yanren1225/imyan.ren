import { r2, BUCKET_NAME, ENDPOINT } from '$lib/server/r2'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { XMLParser } from 'fast-xml-parser'
import { env } from '$env/dynamic/private'

// Helper to parse S3 XML response
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_'
})

export const load: PageServerLoad = async ({ depends }) => {
  depends('r2:files')

  const bucketName = env.R2_BUCKET_NAME || 'R2 Storage'

  try {
    // ListObjectsV2 URL
    const url = `${ENDPOINT}/${BUCKET_NAME}?list-type=2`

    // Sign and fetch using aws4fetch
    const response = await r2.fetch(url)

    if (!response.ok) {
      throw new Error(`S3 list failed: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()
    const result = parser.parse(xml)

    // Handle empty bucket case where Contents is undefined
    const contents = result.ListBucketResult?.Contents
    const filesData = contents ? (Array.isArray(contents) ? contents : [contents]) : []

    const files = filesData
      .map((file: any) => ({
        key: file.Key,
        lastModified: new Date(file.LastModified),
        size: Number(file.Size),
        etag: file.ETag?.replace(/"/g, ''), // Remove quotes if present
      }))
      .sort((a: any, b: any) => {
        return (b.lastModified?.getTime() ?? 0) - (a.lastModified?.getTime() ?? 0)
      })

    return {
      files,
      bucketName,
    }
  } catch (error) {
    console.error('Failed to list files:', error)
    return {
      files: [],
      bucketName,
      error: 'Failed to fetch files',
    }
  }
}

export const actions = {
  upload: async ({ request }) => {
    const data = await request.formData()
    const file = data.get('file') as File

    if (!file) {
      return fail(400, { missing: true })
    }

    try {
      // Calculate hash
      const buffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hash = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')

      // Get date parts
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')

      // Get extension
      const ext = file.name.split('.').pop() || ''
      const key = `${year}/${month}/${hash}.${ext}`

      // Upload using aws4fetch
      // Note: R2/S3 usually requires the key to be path-encoded
      const url = `${ENDPOINT}/${BUCKET_NAME}/${encodeURIComponent(key)}`

      const response = await r2.fetch(url, {
        method: 'PUT',
        body: buffer,
        headers: {
          'Content-Type': file.type,
          'Content-Length': String(buffer.byteLength)
        }
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Upload failed:', error)
      return fail(500, { error: 'Upload failed' })
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData()
    const key = data.get('key') as string

    if (!key) {
      return fail(400, { missing: true })
    }

    try {
      const url = `${ENDPOINT}/${BUCKET_NAME}/${encodeURIComponent(key)}`

      const response = await r2.fetch(url, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Delete failed:', error)
      return fail(500, { error: 'Delete failed' })
    }
  },

  logout: async ({ cookies }) => {
    cookies.delete('auth', { path: '/' })
    return { success: true }
  },
} satisfies Actions
