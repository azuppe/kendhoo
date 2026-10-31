'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type DiaryImage = {
  image: any
  caption?: string | null
  location?: string | null
  isVideo?: boolean | null
}

export const GalleryCoverflow: React.FC<{
  eyebrow?: string | null
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  images: DiaryImage[]
  viewMoreLabel?: string | null
  viewMoreUrl?: string | null
}> = ({ eyebrow, title, titleColor, description, images, viewMoreLabel, viewMoreUrl }) => {
  const locations = useMemo(
    () => Array.from(new Set((images || []).map((item) => item.location).filter(Boolean))) as string[],
    [images],
  )
  const [activeLocation, setActiveLocation] = useState<string | null>(locations[0] ?? null)
  const [index, setIndex] = useState(0)

  const filtered = useMemo(
    () => (activeLocation ? images.filter((item) => item.location === activeLocation) : images),
    [images, activeLocation],
  )

  const count = filtered.length
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0

  const goTo = (i: number) => {
    if (count === 0) return
    setIndex(((i % count) + count) % count)
  }

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4   text-center">
        {eyebrow && <p className="text-sm font-semibold tracking-wide text-foreground mb-3">{eyebrow}</p>}
        {title && (
          <h2 className={`  text-4xl md:text-5xl font-medium mb-4 text-start ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}
        {description && <p className="text-muted-foreground max-w-md mx-auto mb-10">{description}</p>}

        {locations.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setActiveLocation(loc)
                  setIndex(0)
                }}
                className={`px-5 py-2.5 rounded-none text-sm font-medium border transition-colors ${
                  activeLocation === loc
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background text-foreground border-border hover:border-foreground'
                }`}
              >
                {loc}
              </button>
            ))}
            {viewMoreUrl && (
              <a
                href={viewMoreUrl}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-none text-sm font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {viewMoreLabel || 'View More'}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        <div className="relative h-[380px] sm:h-[460px] md:h-[540px] flex items-center justify-center mb-8">
          {filtered.map((item, i) => {
            let offset = i - safeIndex
            const half = Math.floor(count / 2)
            if (offset > half) offset -= count
            if (offset < -half) offset += count

            if (Math.abs(offset) > 2) return null

            const isCenter = offset === 0
            const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.68
            const translateX = offset * 210
            const translateY = isCenter ? 0 : 36
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.45
            const zIndex = 10 - Math.abs(offset)

            return (
              <motion.button
                type="button"
                key={i}
                onClick={() => goTo(i)}
                aria-label={item.location || item.caption || 'View image'}
                className="absolute rounded-[28px] overflow-hidden bg-card w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] md:w-[340px] md:h-[440px]"
                animate={{
                  x: translateX,
                  y: translateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              >
                {item.image && <Media resource={item.image} fill imgClassName="object-cover" />}
                {item.isVideo && (
                  <span className="absolute bottom-4 end-4 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-foreground">
                    <Play className="w-4 h-4 fill-current ms-0.5" />
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(safeIndex - 1)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(safeIndex + 1)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
