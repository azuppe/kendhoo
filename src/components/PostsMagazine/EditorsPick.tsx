import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from './SectionHeader'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { PostCard } from './PostCard'
import { formatReadTime, getPostImage } from './utils'

export const EditorsPick: React.FC<{ posts: Post[]; locale: string }> = ({ posts, locale }) => {
  if (posts.length < 5) return null

  const [featured, ...grid] = posts
  const gridPosts = grid.slice(0, 4)
  const featuredImage = getPostImage(featured)
  const featuredHref = `/${locale}/posts/${featured.slug}`

  return (
    <div>
      <SectionHeader title="Editor's Pick" href={`/${locale}/posts`} />

      <Link
        href={featuredHref}
        className="relative block aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-900 mb-6"
      >
        {featuredImage && (
          <Media resource={featuredImage} imgClassName="object-cover w-full h-full aspect-[21/9]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 space-y-2 text-white max-w-2xl">
          <PostSourceLine post={featured} variant="dark" />
          <h3 className="text-xl lg:text-3xl font-bold leading-tight">{featured.title}</h3>
          {featured.meta?.description && (
            <p className="text-sm lg:text-base text-white/80 line-clamp-2">
              {featured.meta.description}
            </p>
          )}
          <PostFooterLine post={featured} readTimeMinutes={formatReadTime(featured)} variant="dark" />
        </div>
      </Link>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {gridPosts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
