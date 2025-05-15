'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.1), 0 8px 10px -6px rgba(220, 38, 38, 0.1)' }}
    className="bg-white rounded-lg p-6 flex flex-col items-center text-center h-full shadow-md border border-gray-100 relative overflow-hidden"
  >
    {/* Red accent corner */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500 to-red-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
    
    <div className="text-red-600 mb-5 relative z-10">
      {icon}
    </div>
    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-gray-500 text-sm mt-2">{description}</p>
    )}
  </motion.div>
)

export default function ServiceGrid() {
  const services = [
    {
      title: "HD DOME CAMERAS",
      description: "360° surveillance with vandal-resistant housing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <line x1="12" y1="2" x2="12" y2="4"></line>
          <line x1="12" y1="20" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="4" y2="12"></line>
          <line x1="20" y1="12" x2="22" y2="12"></line>
        </svg>
      )
    },
    {
      title: "PTZ CAMERAS",
      description: "Pan, tilt & zoom functionality for comprehensive coverage",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
          <circle cx="10" cy="12" r="3"></circle>
          <path d="M18 12v-2a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-2"></path>
          <line x1="6" y1="12" x2="3" y2="12"></line>
          <path d="M10 7V4"></path>
          <path d="M10 20v-3"></path>
        </svg>
      )
    },
    {
      title: "TURRET CAMERAS",
      description: "Fixed-angle monitoring with discreet installation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"></path>
          <path d="M12 5v2"></path>
          <path d="M12 17v2"></path>
          <path d="M5 12h2"></path>
          <path d="M17 12h2"></path>
        </svg>
      )
    },
    {
      title: "BULLET CAMERAS",
      description: "Long-range surveillance for perimeter security",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2h12c1 0 2 1 2 2z"></path>
          <path d="M22 9v6c0 .6-.4 1-1 1h-3V8h3c.6 0 1 .4 1 1z"></path>
          <circle cx="10" cy="12" r="3"></circle>
        </svg>
      )
    },
    {
      title: "NIGHT VISION",
      description: "Infrared technology for 24/7 surveillance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          <path d="M19 3v4"></path>
          <path d="M21 5h-4"></path>
        </svg>
      )
    },
    {
      title: "LICENSE PLATE RECOGNITION",
      description: "Automatic identification of vehicle plates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2" ry="2"></rect>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="7" y1="6" x2="7" y2="18"></line>
          <line x1="17" y1="6" x2="17" y2="18"></line>
          <line x1="12" y1="6" x2="12" y2="18"></line>
        </svg>
      )
    },
    {
      title: "FACIAL RECOGNITION",
      description: "Advanced biometric identification technology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="9" r="2"></circle>
          <path d="M16 15a4 4 0 0 0-8 0"></path>
          <line x1="9" y1="17" x2="15" y2="17"></line>
        </svg>
      )
    },
    {
      title: "CONTROL ROOM",
      description: "Centralized monitoring for multiple cameras",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="5" y="5" width="5" height="4"></rect>
          <rect x="14" y="5" width="5" height="4"></rect>
          <rect x="5" y="13" width="5" height="6"></rect>
          <rect x="14" y="13" width="5" height="6"></rect>
          <line x1="3" y1="11" x2="21" y2="11"></line>
        </svg>
      )
    },
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Grid of service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}