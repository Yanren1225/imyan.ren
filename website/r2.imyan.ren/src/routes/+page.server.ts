import { ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { r2, BUCKET_NAME } from '$lib/server/r2'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ depends }) => {
  depends('r2:files')

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    })

    const response = await r2.send(command)

    const files = (response.Contents || [])
      .map((file) => ({
        key: file.Key,
        lastModified: file.LastModified,
        size: file.Size,
        etag: file.ETag,
      }))
      .sort((a, b) => {
        // Sort by last modified descending
        return (
          (b.lastModified?.getTime() ?? 0) - (a.lastModified?.getTime() ?? 0)
        )
      })

    return {
      files,
      bucketName: BUCKET_NAME,
    }
  } catch (error) {
    console.error('Failed to list files:', error)
    return {
      files: [],
      bucketName: BUCKET_NAME,
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
      // Calculate hash using Web Crypto API (Cloudflare Workers compatible)
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

      const upload = new Upload({
        client: r2,
        params: {
          Bucket: BUCKET_NAME,
          Key: key,
          Body: Buffer.from(buffer),
          ContentType: file.type,
        },
      })

      await upload.done()

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
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      await r2.send(command)

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
