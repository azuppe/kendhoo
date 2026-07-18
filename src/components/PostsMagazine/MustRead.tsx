import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from './SectionHeader'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { PostCardCompact } from './PostCard'
import { formatReadTime, getPostImage } from './utils'

export const MustRead: React.FC<{ posts: Post[]; locale: string }> = ({ posts, locale }) => {
  if (posts.length < 3) return null

  const [left, center, ...rest] = posts
  const rightPosts = rest.slice(0, 2)
  const centerImage = getPostImage(center)
  const centerHref = `/${locale}/posts/${center.slug}`

  return (
    <div>
      <SectionHeader title="Must Read" href={`/${locale}/posts`} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <PostCardCompact post={left} locale={locale} />
        </div>

        <Link
          href={centerHref}
          className="lg:col-span-2 relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-900"
        >
          {centerImage && (
            <Media
              resource={centerImage}
              imgClassName="object-cover w-full h-full aspect-[16/10] opacity-90"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 text-white">
            <PostSourceLine post={center} variant="dark" />
            <h3 className="text-lg lg:text-xl font-bold leading-snug">{center.title}</h3>
            {center.meta?.description && (
              <p className="text-sm text-white/80 line-clamp-2">{center.meta.description}</p>
            )}
            <PostFooterLine post={center} readTimeMinutes={formatReadTime(center)} variant="dark" />
          </div>
        </Link>

        <div className="lg:col-span-1 flex flex-col gap-6">
          {rightPosts.map((post) => (
            <PostCardCompact key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  )
}
