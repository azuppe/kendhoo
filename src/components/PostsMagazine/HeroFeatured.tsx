import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { formatReadTime, getPostImage } from './utils'

export const HeroFeatured: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)
  const href = `/${locale}/posts/${post.slug}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <Link
        href={href}
        className="block aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-gray-100"
      >
        {image && (
          <Media resource={image} imgClassName="object-cover w-full h-full aspect-[4/3] lg:aspect-[16/11]" />
        )}
      </Link>

      <div className="space-y-4">
        <PostSourceLine post={post} />
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight text-gray-900">
          <Link href={href}>{post.title}</Link>
        </h1>
        {post.meta?.description && (
          <p className="text-gray-500 text-sm lg:text-base line-clamp-3">{post.meta.description}</p>
        )}
        <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
      </div>
    </div>
  )
}
