'use client'

import * as React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Homepage, Media } from '@/payload-types'

export default function AnimatedHeroSlider({ homepage }: { homepage: Homepage }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Fixed: Add proper null/undefined check with optional chaining
  const hasSlides = homepage?.sliderImage && homepage?.sliderImage.length > 0

  // Create slides array with safe default values
  const slides: Array<{ image: { url: string | null }; link: string; id: string | null }> = hasSlides 
    ? homepage.sliderImage?.map((slide) => ({
        image: {
          url: typeof slide?.image === 'object' && slide?.image && 'url' in slide.image 
            ? slide.image.url ?? null // Explicitly handle undefined
            : null,
        },
        link: slide && typeof slide === 'object' && 'link' in slide ? String(slide.link || '') : '', // Ensure link is a string
        id: slide && typeof slide === 'object' && 'id' in slide ? slide.id || null : null,
      })) ?? [] // Ensure the result is not undefined
    : []; // Default to empty array

  useEffect(() => {
    // Only auto-play if we have slides
    if (!hasSlides || slides.length === 0) return;
    
    const timer = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, hasSlides, slides.length])

  const handleNext = () => {
    if (!hasSlides || slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 400)
  }

  const handlePrevious = () => {
    if (!hasSlides || slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 400)
  }

  // If no slides, return placeholder or nothing
  if (!hasSlides || slides.length === 0) {
    return (
      <section className="relative w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
        <p>No slider images available</p>
      </section>
    );
  }

  // Safely access current slide
  const currentSlide = slides[currentIndex];
  
  return (
    <section className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {currentSlide?.image?.url ? (
            <Image
              src={currentSlide.image.url}
              alt={`slide${currentSlide.id || currentIndex}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Image not available</p>
            </div>
          )}
          
          {/* Fixed: Add position: absolute to the overlay div */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-y-64 md:gap-y-0 text-center text-background dark:text-primary p-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, staggerChildren: 0.5 }}
              className="md:text-7xl text-2xl font-bold mb-4"
            >
              {/* Fixed: Convert empty object to string */}
              {currentSlide?.id ? String(currentSlide.id) : ''}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, staggerChildren: 0.5 }}
              className="text-2xl max-w-2xl"
            >
              {currentSlide?.link || ''}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background dark:bg-secondary bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-black dark:text-muted-foreground" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background dark:bg-secondary bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-black dark:text-muted-foreground" />
      </button>
    </section>
  )
}
