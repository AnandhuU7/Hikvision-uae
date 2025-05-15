import React from 'react'

const defaultLabels = {
  plural: 'Docs',
  singular: 'Doc',
}

// Define a type for the collection labels
type CollectionLabels = {
  [key: string]: {
    plural: string
    singular: string
  }
}

const defaultCollectionLabels: CollectionLabels = {
  products: {
    // Fixed typo from 'prodcuts' to 'products'
    plural: 'Products',
    singular: 'Product',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: string
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  // Safely get the labels
  const collectionLabels = collection
    ? defaultCollectionLabels[collection] || defaultLabels
    : defaultLabels

  const { plural, singular } = collectionLabelsFromProps || collectionLabels

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
