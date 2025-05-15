'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookie-consent')
    
    // Only show banner if no choice has been made
    if (!cookieConsent) {
      // Wait a moment before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
    
    // Here you could initialize any tracking or analytics tools
    // Example: initializeAnalytics()
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setIsVisible(false)
    
    // Here you would ensure no tracking cookies are set
    // Example: disableAllTracking()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">We Value Your Privacy</h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. To learn more, please read our{' '}
              <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium transition-colors w-full md:w-auto"
              aria-label="Reject cookies"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors w-full md:w-auto"
              aria-label="Accept cookies"
            >
              Accept All
            </button>
          </div>
          <button 
            onClick={handleReject}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close cookie banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}