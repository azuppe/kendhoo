import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { formatReadTime, getPostImage } from './utils'

export const HeroFeatured: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)
  const href = `/${locale}/posts/${post.slug}`

  return (
    <div className="relative rounded-2xl bg-gray-900 overflow-hidden">
      <Link href={href} className="relative block aspect-[16/10] lg:aspect-[21/9] w-full">
        {image && (
          <Media
            resource={image}
            imgClassName="object-cover w-full h-full aspect-[16/10] lg:aspect-[21/9] opacity-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 space-y-3 text-white max-w-2xl">
          <PostSourceLine post={post} variant="dark" />
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
          {post.meta?.description && (
            <p className="text-white/80 text-sm lg:text-base line-clamp-2">
              {post.meta.description}
            </p>
          )}
          <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} variant="dark" />
        </div>
        <span className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>
    </div>
  )
}
