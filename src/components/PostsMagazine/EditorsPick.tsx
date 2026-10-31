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

      <Link href={featuredHref} className="group mb-16 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-card lg:col-span-8">
          {featuredImage && (
            <Media
              resource={featuredImage}
              alt={featured.title}
              imgClassName="object-cover w-full h-full aspect-[4/3] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
          )}
        </div>
        <div className="space-y-5 lg:col-span-4">
          <PostFooterLine post={featured} readTimeMinutes={formatReadTime(featured)} />
          <h3 className="font-serif text-4xl leading-[1.05] lg:text-5xl">{featured.title}</h3>
          {featured.meta?.description && (
            <p className="line-clamp-4 text-[16px] leading-relaxed text-muted-foreground">
              {featured.meta.description}
            </p>
          )}
          <PostSourceLine post={featured} />
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {gridPosts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
