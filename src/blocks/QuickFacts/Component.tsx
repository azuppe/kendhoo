import React from 'react'
import { Send } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

import { QuickFactsMosaic } from './Mosaic'

type QuickFact = {
  icon?: string | null
  label?: string | null
  value?: string | null
  description?: string | null
  variant?: 'image' | 'color' | null
  image?: any
  color?: 'blue' | 'white' | null
  span?: 'normal' | 'wide' | 'tall' | null
  button?: { label?: string | null; url?: string | null } | null
}

export type QuickFactsBlockProps = {
  title?: string | null
  layout?: 'stats' | 'mosaic' | null
  description?: string | null
  button?: { label?: string | null; url?: string | null } | null
  image1?: (string | null) | MediaType
  image2?: (string | null) | MediaType
  facts: QuickFact[]
}

export const QuickFactsBlock: React.FC<QuickFactsBlockProps> = ({
  title,
  layout = 'stats',
  description,
  button,
  image1,
  image2,
  facts,
}) => {
  if (layout === 'mosaic') {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4  ">
          {title && (
            <h2 className="  text-4xl md:text-5xl font-bold mb-8 text-start">{title}</h2>
          )}
          <QuickFactsMosaic facts={facts} />
        </div>
      </section>
    )
  }

  const hasImages = !!image1 || !!image2

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {title && (
              <h2 className="  text-4xl md:text-5xl font-bold mb-6 text-start">{title}</h2>
            )}
            {description && (
              <div className="text-gray-600 leading-relaxed space-y-4 mb-8 max-w-md">
                {description
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            )}
            {button?.label && (
              <div className="relative inline-block">
                <svg
                  className="hidden lg:block absolute -left-24 -bottom-20 w-[420px] h-[200px] text-gray-300 pointer-events-none"
                  viewBox="0 0 420 200"
                  fill="none"
                >
                  <path
                    d="M0,40 C 40,150 190,180 290,145 C 330,131 355,105 375,75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />
                </svg>
                <Send className="hidden lg:block absolute -right-24 -bottom-8 w-5 h-5 rotate-[50deg] text-gray-400" />
                <a
                  href={button.url || '#'}
                  className="relative inline-flex items-center justify-center px-7 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-black transition-colors"
                >
                  {button.label}
                </a>
              </div>
            )}

            {!!facts?.length && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 relative">
                {facts.map((fact, i) => {
                  const match = fact.value?.match(/^(.*?)([+%]+)$/)
                  const base = match ? match[1] : fact.value
                  const suffix = match ? match[2] : null
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="  text-3xl md:text-4xl font-bold leading-none">
                        {base}
                        {suffix && <span className="text-gray-900">{suffix}</span>}
                      </span>
                      <span className="text-sm text-gray-500">
                        {fact.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {hasImages && (
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 w-full">
              <svg
                className="hidden lg:block absolute -top-14 -right-10 w-40 h-40 text-gray-300 pointer-events-none"
                viewBox="0 0 160 160"
                fill="none"
              >
                <path
                  d="M10,140 C 10,60 90,10 150,10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              </svg>
              {image1 && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
                  <Media resource={image1} imgClassName="w-full h-full object-cover" fill />
                </div>
              )}
              {image2 && (
                <div className="absolute bottom-[-6%] right-[-8%] w-[62%] aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-[18deg] ring-8 ring-white">
                  <Media resource={image2} imgClassName="w-full h-full object-cover" fill />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
