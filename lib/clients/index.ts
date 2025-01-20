import { createJSONClient } from '@/lib/clients/json/jsonClient'
import { createStrapiClient } from '@/lib/clients/strapi/strapiClient'
import { config, DATA_STORE_PROVIDERS } from '@/next.config'

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

export const client = createCMSClient(config.DATA_STORE)
