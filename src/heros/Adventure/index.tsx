'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Compass } from 'lucide-react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const AdventureHero: React.FC<Page['hero']> = ({
  media,
  richText,
  badge,
  navItems,
  avatars,
  joinedCount,
  joinedLabel,
  description,
  links,
  featuredImage,
  featuredTitle,
  featuredDescription,
  galleryImages,
}) => {
  const bookNowLink = links?.[0]?.link

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 -z-10">
          <Media fill imgClassName="object-cover" priority resource={media} />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between gap-4 px-4 md:px-8 pt-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/40">
              <Compass className="w-5 h-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">BromoRise</span>
          </Link>

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

          {bookNowLink?.url && (
            <Link
              href={bookNowLink.url}
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md pl-4 pr-1.5 py-1.5 text-sm font-medium shrink-0"
            >
              {bookNowLink.label || 'Book now'}
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-900">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          )}
        </nav>

        {badge && (
          <div className="flex justify-center mt-12">
            <span className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm">
              {badge}
            </span>
          </div>
        )}

        <div className="text-center px-4 mt-6">
          {richText && (
            <RichText
              className="mx-auto max-w-5xl text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight [&_p]:my-0"
              content={richText}
              enableGutter={false}
            />
          )}
        </div>

        <div className="mt-auto px-4 md:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_repeat(3,minmax(0,1fr))] gap-4 items-end">
            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 flex flex-col gap-6">
              {Array.isArray(avatars) && avatars.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {avatars.map((a, i) => (
                      <span
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white overflow-hidden"
                      >
                        {a.image && typeof a.image === 'object' && (
                          <Media
                            resource={a.image}
                            imgClassName="w-full h-full object-cover"
                            className="w-full h-full"
                          />
                        )}
                      </span>
                    ))}
                  </div>
                  {(joinedCount || joinedLabel) && (
                    <span className="text-sm">
                      <strong>{joinedCount}</strong> {joinedLabel}
                    </span>
                  )}
                </div>
              )}

              {description && <p className="text-sm text-white/85 leading-relaxed">{description}</p>}

              {bookNowLink?.url && (
                <Link
                  href={bookNowLink.url}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-white text-gray-900 pl-5 pr-1.5 py-1.5 text-sm font-medium"
                >
                  {bookNowLink.label || 'Book now'}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              )}
            </div>

            {featuredImage && typeof featuredImage === 'object' && (
              <div className="rounded-3xl overflow-hidden relative h-64 lg:h-72 group">
                <Media
                  resource={featuredImage}
                  fill
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {(featuredTitle || featuredDescription) && (
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {featuredTitle && <h3 className="text-lg font-semibold">{featuredTitle}</h3>}
                    {featuredDescription && (
                      <p className="text-sm text-white/80 mt-1 line-clamp-2">
                        {featuredDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {Array.isArray(galleryImages) &&
              galleryImages.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden relative h-64 lg:h-72 hidden md:block group"
                >
                  {item.image && typeof item.image === 'object' && (
                    <Media
                      resource={item.image}
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdventureHero
