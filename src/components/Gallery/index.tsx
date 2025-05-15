'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem {
  id: string
  title: string
  image: {
    url?: string
    filename?: string
    id?: string
  }
  category: {
    id: string
    title: string
  } | string
  description?: string
}

interface GalleryCategory {
  id: string
  title: string
}

interface GalleryProps {
  items: GalleryItem[]
  categories: GalleryCategory[]
  title?: string
}

export default function Gallery({ items = [], categories = [], title = 'Hikvision Installation Gallery' }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items)

  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items)
    } else {
      setFilteredItems(
        items.filter((item) => {
          const categoryId = typeof item.category === 'string' ? item.category : item.category?.id
          return categoryId === selectedCategory
        })
      )
    }
  }, [selectedCategory, items])

  // Helper function to get category title
  const getCategoryTitle = (item: GalleryItem) => {
    if (typeof item.category === 'object' && item.category !== null) {
      return item.category.title
    }
    if (typeof item.category === 'string') {
      const foundCategory = categories.find(cat => cat.id === item.category)
      return foundCategory?.title || 'Uncategorized'
    }
    return 'Uncategorized'
  }

  // Create rectangular height classes - one long, one short
  const heightClasses = [
    "h-[400px]", // Long rectangle
    "h-[260px]", // Short rectangle
  ];

  // Simple alternating pattern - one long, one short
  const getHeightClass = (index: number) => {
    return index % 2 === 0 ? heightClasses[0] : heightClasses[1];
  };

  return (
    <div className="py-16 bg-white text-black"> {/* Changed to white background */}
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center">
              {/* Red accent bar */}
              <span className="w-1.5 h-8 bg-red-600 mr-3 rounded-sm block"></span>
              
              {/* Multi-colored title with added gap */}
              {title === 'Hikvision Installation Gallery' ? (
                <>
                  <span className="text-red-600">Hik</span>
                  <span className="text-gray-500 mr-2">vision</span>
                  <span className="text-gray-900">Installation Gallery</span>
                </>
              ) : (
                title
              )}
            </h2>
            {/* Removed descriptive text as requested */}
          </div>
          
          <div className="w-full md:w-auto">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-[200px] bg-white border border-gray-300 text-gray-800 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Masonry grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative bg-white border border-red-500 overflow-hidden ${getHeightClass(index)}`}
                >
                  {/* Image with overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    {item.image && (item.image.url || item.image.filename) ? (
                      <>
                        <img 
                          src={
                            item.image.url || 
                            `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/media/${item.image.filename}`
                          } 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Lighter gradient overlay for white theme */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Icon and headline at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    {/* Icon - alternating between globe and heart icons */}
                    <div className="flex justify-center mb-2">
                      {index % 2 === 0 ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Headline in all caps */}
                    <h3 className="font-medium text-white text-sm tracking-wider uppercase">
                      {getCategoryTitle(item)}
                    </h3>
                  </div>
                  
                  {/* Reveal title on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-6">
                      <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-300 text-sm max-w-xs mx-auto">{item.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Full card clickable link */}
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Viewing item: ${item.id}`);
                    }}
                    className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
                    aria-label={`View details for ${item.title}`}
                  >
                    <span className="sr-only">View details</span>
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-600 text-lg">No items found in this category</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}