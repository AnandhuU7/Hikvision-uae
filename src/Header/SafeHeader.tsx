'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Import the Header component with dynamic import to avoid SSR
const ClientOnlyHeader = dynamic(() => import('./ClientHeader'), { 
  ssr: false,
  loading: () => <div className="header-placeholder" style={{ height: '80px', width: '100%' }} />
})

export default function SafeHeader({ navItems = [] }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <div className="header-placeholder" style={{ height: '80px', width: '100%' }}></div>
  }
  
  return <ClientOnlyHeader navItems={navItems} />
}