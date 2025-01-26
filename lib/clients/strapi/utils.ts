export const token = process.env.STRAPI_API_TOKEN
export const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

export const strapiFetch = async <T>(url: string): Promise<T | null> => {
    try {
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) {
            console.error(
                `Strapi fetch failed: ${res.status} ${res.statusText}`
            )
            return null
        }

        const json = await res.json()
        return json.data || null
    } catch (error) {
        console.error(`Strapi fetch failed: ${error}`)
        return null
    }
}

export const fetchAndTransform = async <T, U>(
    url: string,
    transformFn: (item: T) => U
): Promise<U[]> => {
    const data = await strapiFetch<T[]>(url)
    return data ? data.map(transformFn) : []
}

export const fetchAndTransformSingle = async <T, U>(
    url: string,
    transformFn: (item: T) => U
): Promise<U | null> => {
    const data = await strapiFetch<T[]>(url)
    return data && data.length > 0 ? transformFn(data[0]) : null
}
