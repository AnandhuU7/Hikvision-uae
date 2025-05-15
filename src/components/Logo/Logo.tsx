import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  image: string
}

const oldLogo = 'https://hikvision-uae.ae/wp-content/uploads/2024/03/Hikvision-Dubai-Logo-300x30-2.png'

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  
  // Use a fallback if image is empty or invalid
  const src = props.image && props.image.trim() !== '' ? props.image : oldLogo
  
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Company Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-auto', className)}
      src={src}
      onError={(e) => {
        // Fallback if image fails to load
        e.currentTarget.src = oldLogo
      }}
    />
  )
}
