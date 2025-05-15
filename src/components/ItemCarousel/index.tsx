'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Simplified interface - direct image field instead of heroImage
interface Item {
  id?: string
  title: string
  description?: string
  url?: string
  image: {
    id?: string
    filename?: string
    url?: string
  }
  isNew?: boolean
}

export default function ItemCarousel({ items = [], title = "Hikvision Solutions" }: { items: Item[], title?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  // Simple responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Navigation functions
  const nextItems = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + itemsPerView
      return nextIndex >= items.length ? 0 : nextIndex
    })
  }
  
  const prevItems = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - itemsPerView
      return nextIndex < 0 ? Math.max(0, items.length - itemsPerView) : nextIndex
    })
  }

  const handleLikeClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleShareClick = (e: React.MouseEvent, item: Item) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description || `Check out this ${item.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };
  
  // Show placeholder if no items
  if (!items.length) {
    return (
      <div className="my-16 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="bg-gray-100 p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-400">No items available</p>
        </div>
      </div>
    )
  }
  
  // Get current visible items
  const visibleItems = items.slice(
    currentIndex,
    Math.min(currentIndex + itemsPerView, items.length)
  )

  return (
    <div className="my-16 py-12 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        
        {/* Section header with styled title */}
        <div className="relative mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center">
            {/* Red accent bar */}
            <span className="w-1.5 h-8 bg-red-600 mr-3 rounded-sm block"></span>
            
            {/* Multi-colored title with added gap */}
            {title === "Hikvision Solutions" ? (
              <>
                <span className="text-red-600">Hik</span>
                <span className="text-gray-500 mr-2">vision</span>
                <span className="text-black">Solutions</span>
              </>
            ) : (
              title
            )}
          </h2>
          
          <div className="flex space-x-3">
            <button
              onClick={prevItems}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white 
                transition-all duration-300 border border-gray-200 shadow-sm"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextItems}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white 
                transition-all duration-300 border border-gray-200 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Item grid */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence initial={false}>
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Updated Hikvision card design */}
                  <div className="h-full flex flex-col rounded border border-red-500 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    {/* Top image section with light gray background */}
                    <div className="relative pt-[75%] bg-gray-50">
                      <img 
                        src={item.image?.url || '/placeholder-image.jpg'} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                      
                      {/* Vector icons in top right - Camera icon removed */}
                      <div className="absolute top-4 right-4 flex space-x-2 z-20"> {/* Added z-20 to be above overlay */}
                        {/* Share icon */}
                        <button 
                          className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                          aria-label="Share product"
                          onClick={(e) => handleShareClick(e, item)}
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        {/* Favorite icon - now with red color when active */}
                        <button 
                          className={`${likedItems[item.id || `item-${index}`] 
                            ? 'bg-red-50' 
                            : 'bg-white'} p-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors`}
                          aria-label={likedItems[item.id || `item-${index}`] ? "Remove from favorites" : "Add to favorites"}
                          onClick={(e) => handleLikeClick(e, item.id || `item-${index}`)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${likedItems[item.id || `item-${index}`] 
                              ? 'text-red-600 fill-red-600' 
                              : 'text-gray-600'}`} 
                          />
                        </button>
                      </div>
                      
                      {/* NEW tag - moved below icons */}
                      {item.isNew && (
                        <div className="absolute top-14 right-4">
                          <span className="text-red-600 text-sm font-bold">NEW</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom section with product details */}
                    <div className="p-4 flex flex-col flex-grow bg-white">
                      {/* Product model at bottom */}
                      <div className="mt-auto">
                        <p className="text-red-600 font-medium">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    
                    {/* Clickable overlay */}
                    <Link 
                      href={item.url || '#'}
                      className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      aria-label={`View details for ${item.title}`}
                    >
                      <span className="sr-only">View details</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}