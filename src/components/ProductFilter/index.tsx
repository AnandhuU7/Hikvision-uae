'use client'

import React, { useState, useEffect } from 'react';
import { ProductGrid } from '../ProductGrid';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  description?: string;
  heroImage?: {
    url: string;
  };
  slug: string;
  meta?: {
    description?: string;
  };
}

interface ProductFilterProps {
  products: Product[];
  showHeader?: boolean;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ products, showHeader = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Apply filtering and sorting
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    
    setFilteredProducts(result);
  }, [products, searchQuery, sortOrder]);

  return (
    <div className="mb-12">
      {/* Only render the header if showHeader is true */}
      {showHeader && (
        <div className="mb-8">
          <div className="bg-blue-500 text-white py-4 px-6 rounded-md mb-6">
            <h1 className="text-3xl font-bold">Pro Series (All) Network Cameras</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Discover our professional series of network cameras that deliver exceptional video quality and advanced features for comprehensive security solutions.
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-600" />
              <span className="font-medium text-gray-800">Filters</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`text-gray-600 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Sidebar - Changed to white theme */}
        <AnimatePresence>
          {(mobileFiltersOpen || !window.matchMedia('(max-width: 768px)').matches) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full md:w-72 bg-white rounded-xl p-5 shadow-md border border-gray-100 md:sticky md:top-4 self-start overflow-hidden"
            >
              <div className="mb-6">
                <h3 className="text-gray-800 text-lg font-medium mb-3 flex items-center">
                  <Search className="h-4 w-4 mr-2 text-red-600" />
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-50 text-gray-800 w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all border border-gray-200 placeholder:text-gray-400"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-800 text-lg font-medium mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  Sort By
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        checked={sortOrder === 'asc'}
                        onChange={() => setSortOrder('asc')}
                        className="peer opacity-0 absolute h-5 w-5"
                      />
                      <div className="h-5 w-5 rounded-full border border-gray-300 peer-checked:border-red-600 peer-checked:bg-red-600 flex items-center justify-center transition-all">
                        <div className="h-2 w-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Name (A-Z)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        checked={sortOrder === 'desc'}
                        onChange={() => setSortOrder('desc')}
                        className="peer opacity-0 absolute h-5 w-5"
                      />
                      <div className="h-5 w-5 rounded-full border border-gray-300 peer-checked:border-red-600 peer-checked:bg-red-600 flex items-center justify-center transition-all">
                        <div className="h-2 w-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Name (Z-A)</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-gray-800 text-lg font-medium mb-3">Results</h3>
                <div className="bg-gray-50 px-4 py-2.5 rounded-lg text-gray-600 border border-gray-100">
                  <span className="font-medium text-red-600">{filteredProducts.length}</span> of <span className="font-medium text-gray-800">{products.length}</span> products
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};