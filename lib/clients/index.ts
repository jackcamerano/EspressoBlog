import { createJSONClient } from '@/lib/clients/json/jsonClient'
import { createStrapiClient } from '@/lib/clients/strapi/strapiClient'
import { DATA_STORE_PROVIDERS } from '@/next.config' // TODO: fix config, share among server and client

import type { CMSClient } from '@/lib/clients/types'

type DataStoreProvider = (typeof DATA_STORE_PROVIDERS)[number]

const cmsClientMap: Record<DataStoreProvider, () => CMSClient> = {
    strapi: createStrapiClient,
    json: createJSONClient
}

const createCMSClient = (cms: DataStoreProvider): CMSClient => {
    const clientCreator = cmsClientMap[cms]
    if (!clientCreator) {
        throw new Error(
            `Unsupported CMS: ${cms}, please add implementation to cmsClientMap`
        )
    }
    return clientCreator()
}

export const client = createCMSClient(
    (process.env.DATA_STORE || 'json') as 'strapi' | 'json' // TODO: fix config, share among server and client
)
