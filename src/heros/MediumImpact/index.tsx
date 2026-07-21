'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Globe2 } from 'lucide-react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  title,
  media,
  richText,
  links,
  navItems,
  description,
}) => {
  const primaryLink = links?.[0]?.link
  const contactLink = links?.[1]?.link

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 -z-10">
          <Media fill imgClassName="object-cover" priority resource={media} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between gap-6 px-6 md:px-12 pt-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Globe2 className="w-6 h-6" />
            {title && <span className="text-lg font-semibold tracking-tight">{title}</span>}
          </Link>

          {Array.isArray(navItems) && navItems.length > 0 && (
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {contactLink?.url && (
            <Link
              href={contactLink.url}
              className="rounded-full bg-white text-gray-900 px-6 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors shrink-0"
            >
              {contactLink.label || 'Contact us'}
            </Link>
          )}
        </nav>

        <div className="mt-auto px-6 md:px-12 pb-12 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            {richText && (
              <RichText
                className="mb-8 font-medium tracking-tight leading-[0.95] text-5xl md:text-6xl lg:text-7xl [&_p]:my-0"
                content={richText}
                enableGutter={false}
              />
            )}

            {primaryLink?.url && (
              <Link
                href={primaryLink.url}
                className="inline-flex items-center gap-3 rounded-full bg-lime-300 pl-1.5 pr-6 py-1.5 text-sm font-medium text-gray-900 hover:bg-lime-200 transition-colors"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-950 text-white">
                  <ArrowRight className="w-5 h-5" />
                </span>
                {primaryLink.label || 'Plan your trip'}
              </Link>
            )}
          </div>

          {description && (
            <p className="text-lg leading-snug text-right md:max-w-[12rem] shrink-0">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MediumImpactHero
