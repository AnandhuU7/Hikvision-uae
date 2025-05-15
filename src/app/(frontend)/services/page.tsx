import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function services() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'servicepage',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })
  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{services.docs[0]?.title || 'Services'}</h1>
        </div>
      </div>
    </div>
  )
}