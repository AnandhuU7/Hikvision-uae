'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQsProps {
  items: FAQ[]
  title?: string
}

export default function FAQs({ items = [], title = 'Frequently Asked Questions' }: FAQsProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState<FAQ[]>(items)

  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(items)
      return
    }
    
    const filtered = items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredItems(filtered)
  }, [searchQuery, items])

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Group FAQs by category if categories exist
  const hasCategories = filteredItems.some(item => item.category)
  
  const groupedItems = hasCategories 
    ? filteredItems.reduce((acc, item) => {
        const category = item.category || 'General'
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(item)
        return acc
      }, {} as Record<string, FAQ[]>)
    : { 'All Questions': filteredItems }

  return (
    <div className="py-16 bg-white"> {/* Changed to white background */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left column with text and search */}
          <div className="lg:w-1/2">
            <div className="flex items-center mb-4">
              {/* Red vertical accent bar */}
              <span className="w-1.5 h-8 bg-red-600 mr-3 rounded-sm block"></span>
              
              {/* Multi-colored title */}
              {title === 'Frequently Asked Questions' ? (
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-red-600">Frequently</span>{' '}
                  <span className="text-gray-500 mr-1">Asked</span>{' '}
                  <span className="text-gray-900">Questions</span>
                </h2>
              ) : (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
              )}
            </div>
            
            {/* Search input */}
            <div className="relative max-w-md mb-8">
              <input
                type="text"
                placeholder="Search question here"
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* FAQ Categories */}
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category} className="mb-6">
                  {hasCategories && category !== 'All Questions' && (
                    <h3 className="text-lg font-medium text-indigo-700 mb-3">{category}</h3>
                  )}
                  
                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                        >
                          <h4 className="text-base font-medium text-gray-800">{item.question}</h4>
                          <svg 
                            className={`transition-transform duration-300 w-5 h-5 ${openItems[item.id] ? 'rotate-180' : ''} text-indigo-600`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {openItems[item.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-5 py-4 text-gray-600 border-t border-gray-100 bg-gray-50">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* No results message */}
              {filteredItems.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions found matching your search.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column with the FAQ illustration */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <img 
                src="/faqs.png" 
                alt="FAQ Illustration" 
                className="w-full h-auto object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  // Make fallback visible
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.fallback-content');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'flex';
                    }
                  }
                }}
              />
              
              {/* Fallback content if image doesn't load */}
              <div className="fallback-content absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-9xl font-bold text-gray-100 select-none">FAQ</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="text-indigo-500 text-5xl">?</span>
                    <span className="absolute -top-4 -right-4 text-orange-500 text-3xl">?</span>
                    <span className="absolute top-2 -left-8 text-red-400 text-4xl">?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}