import { S3Client } from '@aws-sdk/client-s3'
import { env } from '$env/dynamic/private'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

// Polyfill DOMParser for AWS SDK in Node.js environment
// This fixes "ReferenceError: DOMParser is not defined"
if (!globalThis.DOMParser) {
    globalThis.DOMParser = DOMParser
    globalThis.XMLSerializer = XMLSerializer
}

// Debug environment variables
console.log('R2 Environment Variables Check:', {
    R2_ACCOUNT_ID: env.R2_ACCOUNT_ID ? 'SET' : 'MISSING',
    R2_ACCESS_KEY_ID: env.R2_ACCESS_KEY_ID ? 'SET' : 'MISSING',
    R2_SECRET_ACCESS_KEY: env.R2_SECRET_ACCESS_KEY ? 'SET' : 'MISSING',
    R2_BUCKET_NAME: env.R2_BUCKET_NAME ? 'SET' : 'MISSING',
})

if (!env.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
    const missing = []
    if (!env.R2_ACCOUNT_ID) missing.push('R2_ACCOUNT_ID')
    if (!env.R2_ACCESS_KEY_ID) missing.push('R2_ACCESS_KEY_ID')
    if (!env.R2_SECRET_ACCESS_KEY) missing.push('R2_SECRET_ACCESS_KEY')
    throw new Error(
        `R2 credentials are not configured. Missing: ${missing.join(', ')}`,
    )
}

export const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
})

export const BUCKET_NAME = env.R2_BUCKET_NAME
