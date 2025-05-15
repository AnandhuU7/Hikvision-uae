'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SlideImage {
  image: any; // For Payload media structure
  altText?: string;
}

interface HomepageProps {
  sliderImage?: SlideImage[];
}

export default function EnhancedHeroSlider({ homepage }: { homepage: HomepageProps }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  
  // Process sliderImage data - keep this section as is
  const slides = React.useMemo(() => {
    if (!homepage?.sliderImage?.length) return []
    
    return homepage.sliderImage.map((slide, index) => {
      let imageUrl = null
      
      if (slide.image) {
        if (typeof slide.image === 'string') {
          imageUrl = slide.image
        } 
        else if (typeof slide.image === 'object') {
          if (slide.image.url) {
            imageUrl = slide.image.url
          } 
          else if (slide.image.filename) {
            imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${slide.image.filename}`
          }
          else if (slide.image.sizes?.thumbnail?.url) {
            imageUrl = slide.image.sizes.thumbnail.url
          }
          else if (slide.image.id) {
            imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${slide.image.id}`
          }
          else if (slide.image.relationTo === 'media' && slide.image.value) {
            if (typeof slide.image.value === 'string') {
              imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${slide.image.value}`
            } else if (slide.image.value.filename) {
              imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${slide.image.value.filename}`
            }
          }
        }
      }
      
      return {
        image: imageUrl,
        altText: slide.altText || 'Security solution image',
      }
    })
  }, [homepage])

  // Auto-rotation logic
  useEffect(() => {
    if (!slides.length || isHovering) return

    const timer = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, slides.length, isHovering])

  // Navigation handlers
  const handleNext = () => {
    if (!slides.length) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const handlePrevious = () => {
    if (!slides.length) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  // If no slides, show placeholder
  if (!slides.length) {
    return (
      <div className="flex justify-center w-full">
        <section className="relative w-[94%] h-[650px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-md overflow-hidden flex items-center justify-center mt-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-white font-medium mb-2">No security images available</p>
            <p className="text-sm text-gray-400">
              Please add security camera images in the CMS
            </p>
          </div>
        </section>
      </div>
    )
  }

  // Get current slide
  const currentSlide = slides[currentIndex]
  
  return (
    <div className="flex justify-center w-full">
      <section 
        className="relative w-[94%] h-[650px] overflow-hidden rounded-md shadow-2xl mt-6 border border-gray-800"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* High-tech overlay border with animated pulse */}
        <div className="absolute inset-0 z-10 pointer-events-none border border-red-500 rounded-md opacity-50"></div>
        <div className="absolute inset-0 z-10 pointer-events-none border border-red-500 rounded-md opacity-20 animate-pulse"></div>

        {/* Tech-style corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 z-20"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 z-20"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500 z-20"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 z-20"></div>

        {/* Modern progress indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3 p-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 3000)
              }}
              className={`relative h-1.5 transition-all duration-500 ${i === currentIndex ? 'bg-red-600 w-10' : 'bg-white/40 w-6'}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentIndex && (
                <span className="absolute inset-0 bg-red-600 animate-pulse rounded-sm"></span>
              )}
            </button>
          ))}
        </div>

        {/* Slide content with better transitions */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-black"
          >
            {currentSlide?.image ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <motion.img 
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7, ease: "easeOut" }}
                  src={currentSlide.image}
                  alt={currentSlide.altText}
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    console.error("Image failed to load:", currentSlide.image);
                    e.currentTarget.src = '/placeholder.jpg';
                    e.currentTarget.style.objectFit = 'contain';
                    e.currentTarget.style.maxHeight = '100%';
                    e.currentTarget.style.maxWidth = '100%';
                    e.currentTarget.style.background = '#000';
                  }}
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none"></div>
                
                {/* Tech-inspired overlay elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 left-6">
                    <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
                  </div>
                  
                  {/* Camera status indicator */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">Live Security</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <p className="text-gray-500">Image not available</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced navigation controls */}
        <div 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 
            ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-red-700
              backdrop-blur-md text-white border border-white/10 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        <div 
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 
            ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-red-700
              backdrop-blur-md text-white border border-white/10 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  )
}