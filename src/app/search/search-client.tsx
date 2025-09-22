'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

type SearchItem = {
  _id: string
  type: 'category' | 'subcategory' | 'product'
  name: string
  url: string
}

export default function SearchClient() {
  const params = useSearchParams()
  const q = useMemo(() => (params.get('q') || '').trim(), [params])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<SearchItem[]>([])
  const [subcategories, setSubcategories] = useState<SearchItem[]>([])
  const [products, setProducts] = useState<SearchItem[]>([])
  const [searchQuery, setSearchQuery] = useState(q)

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setCategories([])
        setSubcategories([])
        setProducts([])
        return
      }
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to search')
        const data = await res.json()
        setCategories(data.categories || [])
        setSubcategories(data.subcategories || [])
        setProducts(data.products || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Search failed')
        setCategories([])
        setSubcategories([])
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [q])

  const hasResults = (categories && categories.length > 0) || (subcategories && subcategories.length > 0) || (products && products.length > 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-12 flex justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative flex shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="flex-grow pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-lg"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-inner"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              Search Results
            </h1>
            {q && (
              <p className="text-lg text-gray-600 mb-2">
                Showing results for <span className="font-semibold text-red-600">"{q}"</span>
              </p>
            )}
          </div>

          {loading && (
            <div className="py-12 flex items-center gap-3 text-gray-600 justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-red-600" />
              <span>Searching…</span>
            </div>
          )}

          {error && (
            <div className="py-8 text-red-600 text-center">{error}</div>
          )}

          {!loading && !error && !hasResults && (
            <div className="py-4 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">No results found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any products, categories, or subcategories matching "{q}".
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                <p className="text-gray-700 font-medium">Try these suggestions:</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Check your spelling for typos
                  </li>
                  <li className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 101.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Use more general keywords
                  </li>
                  <li className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Try different search terms
                  </li>
                </ul>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Homepage
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && hasResults && (
            <div className="space-y-10">
              {categories?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((c) => (
                      <Link key={c._id} href={c.url} className="group">
                        <div className="p-5 border rounded-xl hover:border-red-400 transition-colors">
                          <div className="text-base font-medium text-gray-900 group-hover:text-red-700">{c.name}</div>
                          <div className="text-xs text-gray-500 mt-1">Category</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {subcategories?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Subcategories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategories.map((s) => (
                      <Link key={s._id} href={s.url} className="group">
                        <div className="p-5 border rounded-xl hover:border-red-400 transition-colors">
                          <div className="text-base font-medium text-gray-900 group-hover:text-red-700">{s.name}</div>
                          <div className="text-xs text-gray-500 mt-1">Subcategory</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {products?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                      <Link key={p._id} href={p.url} className="group">
                        <div className="p-5 border rounded-xl hover:border-red-400 transition-colors">
                          <div className="text-base font-medium text-gray-900 group-hover:text-red-700">{p.name}</div>
                          <div className="text-xs text-gray-500 mt-1">Product</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}


