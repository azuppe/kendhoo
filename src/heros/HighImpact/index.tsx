'use client'
import React from 'react'
import { ArrowDown } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative -mt-[10.4rem] flex items-end text-white" data-theme="light">
      <div className="container mb-10 md:mb-14 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <div className="max-w-2xl">
            {richText && (
              <RichText
                className="mb-0 prose-headings:font-normal prose-headings:tracking-tight prose-headings:leading-[0.98] prose-h1:text-6xl md:prose-h1:text-7xl prose-h2:text-6xl md:prose-h2:text-7xl prose-p:hidden"
                content={richText}
                enableGutter={false}
              />
            )}
          </div>
          <div className="max-w-md md:pb-2">
            {richText && (
              <RichText
                className="mb-6 prose-headings:hidden prose-p:text-base md:prose-p:text-lg prose-p:text-white/90 prose-p:leading-relaxed"
                content={richText}
                enableGutter={false}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink
                        className={`px-10 text-[12px] uppercase tracking-[0.06em] transition-colors ${
                          i === 0
                            ? 'border border-white bg-background text-[#1C1B19] hover:bg-transparent hover:text-white'
                            : 'border border-white/60 bg-transparent text-white hover:bg-background hover:text-[#1C1B19]'
                        }`}
                        {...link}
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-8 end-6 z-10 hidden md:flex items-center justify-center w-14 h-14 border border-white/40"
      >
        <ArrowDown className="w-5 h-5 text-white" />
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            <div className="absolute pointer-events-none start-0 top-0 w-full h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute pointer-events-none start-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
