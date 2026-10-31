'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Media } from '@/components/Media'

export default function HeroCarousel({ ...props }) {
  const posts: any[] = props.posts || []
  const count = posts.length
  const [currentSlide, setCurrentSlide] = useState(0)
  const [playing, setPlaying] = useState(true)

  // Never autoplay for people who ask their system for less motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing || count < 2) return
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % count), 7000)
    return () => clearInterval(timer)
  }, [playing, count])

  if (!count) return null

  const slide = posts[currentSlide]
  const go = (i: number) => setCurrentSlide((i + count) % count)

  const arrow =
    'flex h-12 w-12 items-center justify-center border border-white/60 text-white transition-colors hover:bg-white hover:text-[#1C1B19]'

  return (
    <section aria-roledescription="carousel" aria-label="Featured stories" className="w-full pt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative h-[520px] overflow-hidden bg-card md:h-[680px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentSlide + 1} of ${count}`}
            >
              {slide?.meta?.image && (
                <Media
                  fill
                  priority={currentSlide === 0}
                  alt={slide.title}
                  imgClassName="object-cover"
                  resource={slide.meta.image}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-8 pb-24 text-white md:p-16 md:pb-28">
                <h2 className="max-w-3xl text-4xl leading-[1.04] md:text-6xl lg:text-7xl">{slide?.title}</h2>
                {slide?.meta?.description && (
                  <p className="line-clamp-2 max-w-xl text-[16px] leading-relaxed text-white/90 md:text-[18px]">
                    {slide.meta.description}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <div className="absolute inset-x-8 bottom-8 z-10 flex items-center justify-between md:inset-x-16">
              <div className="flex items-center gap-4">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => go(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide}
                    className="group flex h-11 items-center"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ${
                        index === currentSlide ? 'w-14 bg-white' : 'w-8 bg-white/50 group-hover:bg-white/80'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className={arrow}
                  aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {playing ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4" strokeWidth={1.5} />}
                </button>
                <button type="button" onClick={() => go(currentSlide - 1)} className={arrow} aria-label="Previous slide">
                  <ChevronLeft className="h-5 w-5 rtl:rotate-180" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => go(currentSlide + 1)} className={arrow} aria-label="Next slide">
                  <ChevronRight className="h-5 w-5 rtl:rotate-180" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
