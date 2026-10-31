'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type EventTimelineItem = {
  dayLabel: string
  title: string
  description?: string | null
  images?: any[] | null
}

export type EventTimelineBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  items: EventTimelineItem[]
}

export const EventTimelineBlock: React.FC<EventTimelineBlockProps> = ({ title, titleColor, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`text-2xl md:text-3xl font-medium mb-6 text-start ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="absolute start-[7px] top-2 bottom-2 w-px bg-card" />

          {items?.map((item, i) => {
            const isOpen = openIndex === i
            const isLast = i === items.length - 1

            return (
              <div key={i} className={isLast ? '' : 'border-b border-border mb-6 pb-6'}>
                <div className="relative flex items-start gap-4">
                  <span className="relative z-10 mt-1.5 shrink-0 w-3.5 h-3.5 rounded-full border-2 border-foreground bg-background" />

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex-1 flex items-start justify-between gap-4 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="inline-block px-3 py-1 rounded-none border border-border text-xs font-medium text-muted-foreground">
                      {item.dayLabel}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div className="ms-[26px] mt-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {item.title}
                  </h3>

                  {isOpen && (
                    <>
                      {item.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}

                      {item.images && item.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {item.images.map((image, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="relative aspect-[4/3] rounded-none overflow-hidden"
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
