'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Media } from '@/components/Media'

type EventTimelineItem = {
  dayLabel: string
  title: string
  description?: string | null
  images?: any[] | null
}

export type EventTimelineBlockProps = {
  title?: string | null
  items: EventTimelineItem[]
}

export const EventTimelineBlock: React.FC<EventTimelineBlockProps> = ({ title, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {title && (
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-start">
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-800" />

          {items?.map((item, i) => {
            const isOpen = openIndex === i
            const isLast = i === items.length - 1

            return (
              <div key={i} className={isLast ? '' : 'pb-8'}>
                <div className="relative flex items-start gap-4">
                  <span className="relative z-10 mt-1 shrink-0 w-4 h-4 rounded-full border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-950" />

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex-1 flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                        {item.dayLabel}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 mt-1 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="ml-8 mt-3">
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {item.images && item.images.length > 0 && (
                      <div className="flex gap-3 mt-4 overflow-x-auto">
                        {item.images.map((image, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative shrink-0 w-40 h-32 md:w-48 md:h-36 rounded-2xl overflow-hidden"
                          >
                            {image && typeof image === 'object' && (
                              <Media resource={image} fill imgClassName="object-cover" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
