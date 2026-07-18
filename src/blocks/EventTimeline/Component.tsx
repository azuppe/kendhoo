'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-start">
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

          {items?.map((item, i) => {
            const isOpen = openIndex === i
            const isLast = i === items.length - 1

            return (
              <div key={i} className={isLast ? '' : 'border-b border-gray-100 dark:border-gray-800 mb-6 pb-6'}>
                <div className="relative flex items-start gap-4">
                  <span className="relative z-10 mt-1.5 shrink-0 w-3.5 h-3.5 rounded-full border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-950" />

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex-1 flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="inline-block px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {item.dayLabel}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="ml-[26px] mt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>

                  {isOpen && (
                    <>
                      {item.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}

                      {item.images && item.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {item.images.map((image, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                              {image && typeof image === 'object' && (
                                <Media resource={image} fill imgClassName="object-cover" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
