'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CCTVShowcase() {
  const features = [
    {
      title: "Mobile Access",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <path d="M12 18h.01"></path>
        </svg>
      )
    },
    {
      title: "Scheduled Recording",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="12" cy="15" r="2"></circle>
        </svg>
      )
    },
    {
      title: "Smart Alerts",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          <circle cx="12" cy="12" r="1"></circle>
        </svg>
      )
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* CCTV Camera Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-red-50 rounded-full z-0"></div>
              <div className="absolute -right-8 bottom-1/4 w-16 h-16 bg-red-50 rounded-full z-0"></div>
              <img 
                src="/shopping.webp" 
                alt="Hikvision CCTV Camera" 
                className="w-full h-auto max-w-lg mx-auto relative z-10"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/500x400/f8fafc/475569?text=CCTV+Camera";
                }}
              />
            </div>
          </motion.div>
          
          {/* Features and Text */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Feature Icons */}
            <div className="flex justify-center md:justify-end gap-12 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-red-600 mb-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            {/* Description Text */}
            <div className="mb-8">
              <p className="text-gray-600 max-w-md">
                ADVANCED SECURITY SOLUTIONS WITH HIKVISION TECHNOLOGY. 
                MONITOR YOUR PROPERTY FROM ANYWHERE WITH REAL-TIME ALERTS 
                AND CRYSTAL CLEAR HD FOOTAGE.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-800 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.8 8H17V6c0-.6.4-1 1-1h1V2h-2c-2.2 0-4 1.8-4 4v2H11v3h2v9h3v-9h2l1-3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}