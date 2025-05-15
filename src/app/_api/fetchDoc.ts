import { PAYLOAD_SERVER_URL } from '../../config'

type FetchDocArgs = {
  collection: string
  slug?: string
  id?: string
  draft?: boolean
}

export async function fetchDoc<T>({
  collection,
  slug,
  id,
  draft = false,
}: FetchDocArgs): Promise<T | null> {
  const searchParams = new URLSearchParams()

  if (draft) searchParams.set('draft', 'true')
  if (slug) searchParams.set('slug', slug)

  try {
    let url: string

    if (id) {
      url = `${PAYLOAD_SERVER_URL}/api/${collection}/${id}`
    } else if (collection === 'globals' && slug) {
      // Handle globals which have a different API structure
      url = `${PAYLOAD_SERVER_URL}/api/globals/${slug}`
    } else {
      url = `${PAYLOAD_SERVER_URL}/api/${collection}?where=${encodeURIComponent(
        JSON.stringify({ slug: { equals: slug } })
      )}`
    }

    const res = await fetch(url, {
      next: { tags: [`${collection}_${slug || id}`] },
    })

    if (!res.ok) return null

    const data = await res.json()

    if (collection !== 'globals' && !id && data.docs?.length === 0) return null
    if (collection !== 'globals' && !id && data.docs?.length > 0) return data.docs[0] as T

    return data as T
  } catch (error) {
    console.error(`Error fetching document from ${collection}:`, error)
    return null
  }
}