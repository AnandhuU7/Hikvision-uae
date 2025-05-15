import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PageRange } from '@/components/PageRange'
import FilterComponent from '@/components/FilterComponent/filter'
import { CollectionProducts } from '@/components/CollectionProducts'

type Media = {
  url: string
  alt?: string
}

export default async function products() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      heroImage: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const categories = await payload.find({
    collection: 'categories',
  })

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow-sm w-auto h-fit sticky top-6 hidden sm:block ">
        <h1 className="text-black text-sm"></h1>
        <p className="text-black">{JSON.stringify(categories.docs)}</p>
        <p className="text-black">{JSON.stringify(products.docs)}</p>
        <div className="container mb-8 text-black">
          <PageRange
            collection="products"
            currentPage={products.page}
            limit={12}
            totalDocs={products.totalDocs}
          />
        </div>
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-4 text-black">Filter by category</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input
                type="checkbox"
                id="casual-shirts"
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <label htmlFor="casual-shirts" className="ml-2 text-gray-600">
                Casual shirts <span className="text-gray-400 ml-1">25</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div className="ml-6 flex-1">
        <div className="sm:hidden mb-4">
          <p className="text-black flex justify-center w-[90px] bg-gray-700 mb-8 rounded ">
            <FilterComponent categories={categories} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CollectionProducts products={products.docs} />
        </div>
      </div>
    </div>
  )
}