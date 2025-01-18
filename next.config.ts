import type { NextConfig } from 'next'
import envSchema from 'env-schema'

import type { FromSchema } from 'json-schema-to-ts'

const schema = {
    type: 'object',
    properties: {
        NEXT_PUBLIC_STRAPI_API_URL: { type: 'string' },
        STRAPI_API_TOKEN: { type: 'string' }
    },
    required: ['NEXT_PUBLIC_STRAPI_API_URL', 'STRAPI_API_TOKEN']
} as const

export const config: FromSchema<typeof schema> = envSchema({
    dotenv: true,
    schema
});
 
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    }
}

 
export default nextConfig
