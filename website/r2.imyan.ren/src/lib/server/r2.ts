import { AwsClient } from 'aws4fetch'
import { env } from '$env/dynamic/private'

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

export const r2 = new AwsClient({
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    service: 's3',
    region: 'auto',
})

export const BUCKET_NAME = env.R2_BUCKET_NAME
export const ENDPOINT = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
