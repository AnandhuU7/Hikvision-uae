import { Suspense } from 'react'
import SearchClient from './search-client'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading…</div>}>
      <SearchClient />
    </Suspense>
  )
}


