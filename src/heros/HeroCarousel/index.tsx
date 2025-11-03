'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Media } from '@/components/Media'

export default function HeroCarousel({ ...props }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!props.posts) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % props.posts.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [props.posts])

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % props.posts.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + props.posts.length) % props.posts.length)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 2000 : -2000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 2000 : -2000,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-7xl mx-auto pt-[74px]">
      {props.posts && (
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 200, damping: 30 },
                opacity: { duration: 1 },

              }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-0">
                  <Media
                    className="-mx-4 md:-mx-8 2xl:-mx-16"
                    imgClassName=""
                    priority
                    resource={props.posts[currentSlide]?.meta.image}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>
           

                <div className="relative h-full flex   px-8 md:px-16 flex-col items-start justify-end pb-16">
                  <div className="max-w-3xl text-white">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-3xl md:text-4xl lg:text-6xl font-semi-bold mb-4 md:mb-6 leading-tight"
                    >
                      {props.posts[currentSlide]?.title}
                    </motion.h2>
                  </div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                      className="text-sm md:text-lg leading-relaxed text-gray-100 max-w-full"
                    >
                      {props.posts[currentSlide]?.meta.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {props.posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-orange-500'
                      : 'w-2.5 bg-white/50 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
