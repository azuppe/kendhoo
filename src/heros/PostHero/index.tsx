import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { useTranslations } from 'next-intl'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, coverImage, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title } = post
  const heroImage = coverImage && typeof coverImage === 'object' ? coverImage : metaImage
  const t = useTranslations()

  return (
    <div className="relative flex flex-col gap-0">
      {/* Post image */}
      <div className="w-full aspect-[3/1] md:aspect-[3/1.2] rounded-3xl overflow-hidden bg-gray-200 mb-6">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill imgClassName="object-cover w-full h-full rounded-3xl" resource={heroImage} />
        )}
      </div>
      <div className="relative z-10 px-0 md:px-6 -mt-16 md:-mt-24">
        {/* Category badge */}
        {Array.isArray(categories) && categories.length > 0 && (
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            {typeof categories[0] === 'object' ? categories[0].title : ''}
          </span>
        )}
        {/* Title */}
        <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
          {title}
        </h1>
        {/* Meta info and actions */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {populatedAuthors && populatedAuthors.length > 0 && (
              <span>
                By {populatedAuthors.map((author, i) => author.name).join(', ')}
              </span>
            )}
            {publishedAt && (
              <span>• {formatDateTime(publishedAt)}</span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            {/* Stats (static for now) */}
            <span className="flex items-center gap-1 text-gray-500 text-sm"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1.998 12c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10Zm14-1a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>2.5m</span>
            <span className="flex items-center gap-1 text-gray-500 text-sm"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>15k</span>
            <span className="flex items-center gap-1 text-gray-500 text-sm"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>39k</span>
            {/* Actions */}
            <button className="ml-2 px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition">Share on media</button>
          </div>
        </div>
      </div>
    </div>
  )
}
