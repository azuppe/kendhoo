import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { useTranslations } from 'next-intl'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { coverImage, meta: { image: metaImage } = {}, publishedAt, title } = post
  const heroImage = coverImage && typeof coverImage === 'object' ? coverImage : metaImage
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-0">
      {/* Title */}
      <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
        {title}
      </h1>
      {/* Date */}
      {publishedAt && (
        <span className="mb-6 text-gray-500 text-base">{formatDateTime(publishedAt)}</span>
      )}
      {/* Post image */}
      <div className="w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-gray-200">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill imgClassName="object-cover w-full h-full" resource={heroImage} />
        )}
      </div>
    </div>
  )
}
