export const token = process.env.STRAPI_API_TOKEN
export const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

export const strapiFetch = async <T>(
    url: string,
    defaultValue: T
): Promise<T | null> => {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) {
        console.error(`Strapi fetch failed: ${res.status} ${res.statusText}`)
        return defaultValue
    }

    const json = await res.json()
    return json.data || defaultValue
}
