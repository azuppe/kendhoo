'use client'

import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const PeopleHero: React.FC<Page['hero']> = ({
  title,
  media,
  richText,
  navItems,
  phone,
  description,
  links,
  personName,
  personTitle,
}) => {
  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 -z-10">
          <Media fill imgClassName="object-cover" priority resource={media} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between gap-4 px-4 md:px-8 pt-6">
          {Array.isArray(navItems) && navItems.length > 0 && (
            <ul className="hidden md:flex items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-2">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      i === 0 ? 'bg-white text-gray-900' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {title && (
            <span className="absolute left-1/2 -translate-x-1/2 top-6 text-lg font-semibold tracking-tight hidden md:block">
              {title}
            </span>
          )}

          <div className="ms-auto flex items-center gap-3">
            {phone && (
              <span className="hidden lg:flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                {phone}
              </span>
            )}
            {links?.[1]?.link?.url && (
              <Link
                href={links[1].link.url}
                className="rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium"
              >
                {links[1].link.label || 'Book Appointment'}
              </Link>
            )}
          </div>
        </nav>

        <div className="flex-1 flex items-center px-4 md:px-8">
          <div className="max-w-xl">
            {richText && (
              <RichText
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight [&_p]:my-0"
                content={richText}
                enableGutter={false}
              />
            )}

            {description && (
              <p className="mt-4 text-white/85 max-w-md leading-relaxed">{description}</p>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-3 mt-6">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                        i === 0
                          ? 'bg-white text-gray-900'
                          : 'border border-white/40 text-white bg-white/10 backdrop-blur-md'
                      }`}
                      {...link}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {(personName || personTitle) && (
          <div className="px-4 md:px-8 pb-8 flex justify-end">
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-3 text-right">
              {personName && <p className="font-semibold">{personName}</p>}
              {personTitle && <p className="text-sm text-white/75">{personTitle}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PeopleHero
