import { cn } from '@/utilities/cn'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  products: CardPostData[]
}

export const CollectionProducts: React.FC<Props> = (props) => {
  const { products } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  key={index}
                >
                  <Card
                    className="bg-gray-200 h-48 flex items-center justify-center"
                    doc={result}
                    relationTo="products"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
