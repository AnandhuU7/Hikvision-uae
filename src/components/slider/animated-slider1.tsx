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

  const slides = (homepage.sliderImage || []).map((slide) => ({
    image: {
      url: typeof slide.image === 'object' && 'url' in slide.image ? slide.image.url : '',
    },
    link: (slide as { link?: string }).link || '',
    id: slide.id || null,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 400)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 400)
  }

  return (
    <section className="w-full h-full overflow-hidden z-50">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex]!.image.url || undefined}
            alt={`slide${slides[currentIndex]!.id}`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-y-64 md:gap-y-0 text-center text-background dark:text-primary p-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, staggerChildren: 0.5 }}
              className="md:text-7xl text-2xl font-bold mb-4"
            >
              {slides[currentIndex]!.id}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, staggerChildren: 0.5 }}
              className="text-2xl max-w-2xl"
            >
              {slides[currentIndex]!.link}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

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

      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setTimeout(() => {
                  setIsAutoPlaying(true)
                }, 400)
              }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? 'bg-background dark:bg-foreground/50'
                  : 'bg-secondary dark:bg-secondary opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {isAutoPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-background dark:bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
        />
      )}
    </section>
  )
}