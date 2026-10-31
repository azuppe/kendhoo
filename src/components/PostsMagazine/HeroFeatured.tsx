import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { formatReadTime, getPostImage } from './utils'

/** Full-width photograph with the headline set below it, never over it. */
export const HeroFeatured: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)
  const href = `/${locale}/posts/${post.slug}`

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-card lg:aspect-[21/9]">
        {image && (
          <Media
            resource={image}
            alt={post.title}
            imgClassName="object-cover w-full h-full aspect-[16/10] lg:aspect-[21/9] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="grid gap-6 pt-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="space-y-5 lg:col-span-8">
          <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
          <h1 className="font-serif text-5xl leading-[1.02] lg:text-7xl">{post.title}</h1>
        </div>
        <div className="space-y-4 lg:col-span-4">
          {post.meta?.description && (
            <p className="line-clamp-3 text-[16px] leading-relaxed text-muted-foreground">
              {post.meta.description}
            </p>
          )}
          <PostSourceLine post={post} />
          <span className="link-luxe inline-block">Read the story</span>
        </div>
      </div>
    </Link>
  )
}
