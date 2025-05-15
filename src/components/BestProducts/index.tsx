'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BestProduct {
  id: string
  title: string
  image: {
    url?: string
    filename?: string
    alt?: string
  }
  ribbonText?: string
  description?: string
}

interface BestProductsProps {
  products: BestProduct[]
  title?: string
}

export default function BestProducts({ products = [], title = 'Premium Security Solutions' }: BestProductsProps) {
  if (!products.length) {
    return null
  }

  return (
    <div className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <p className="text-gray-400 mt-3">
            Premium security solutions trusted by professionals worldwide
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              {/* Product Card */}
              <div className="flex flex-col h-full bg-[#0a0e17] rounded-lg overflow-hidden relative"> 
                {/* Ribbon */}
                {product.ribbonText && (
                  <div className="absolute top-0 left-0 z-10 overflow-hidden">
                    <div className="bg-red-600 text-white text-sm py-1 px-6 font-semibold rounded-br-md">
                      {product.ribbonText}
                    </div>
                  </div>
                )}
                
                {/* Product Image */}
                <div className="h-64 relative">
                  {product.image ? (
                    <img
                      src={
                        product.image.url ||
                        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/media/${product.image.filename}`
                      }
                      alt={product.image.alt || product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = "w-full h-full flex items-center justify-center bg-black"
                          fallback.innerHTML = '<span class="text-gray-500">Image unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3">{product.title}</h3>
                  
                  {product.description && (
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  )}
                </div>
                
                {/* Red bar at bottom - full width */}
                <div className="w-full h-3 bg-red-600"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}