import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { SaveButton } from '@/components/Saved/SaveButton'
import { PostSourceLine, PostFooterLine } from './PostMeta'
import { formatReadTime, getPostImage } from './utils'

export const PostCard: React.FC<{ post: Post; locale: string; className?: string }> = ({
  post,
  locale,
  className,
}) => {
  const image = getPostImage(post)
  const href = `/${locale}/posts/${post.slug}`

  return (
    <article className={`group relative ${className || ''}`}>
      <SaveButton
        id={String(post.id)}
        className="absolute end-3 top-3 z-10 bg-background/90 backdrop-blur"
      />
      <Link href={href} className="relative block aspect-[4/5] w-full overflow-hidden bg-card">
        {image && (
          <Media
            resource={image}
            alt={post.title}
            imgClassName="object-cover w-full h-full aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </Link>
      <div className="space-y-3 pt-5">
        <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
        <h3 className="font-serif text-[26px] leading-[1.12]">
          <Link href={href} className="hover:opacity-70">
            {post.title}
          </Link>
        </h3>
        <PostSourceLine post={post} />
      </div>
    </article>
  )
}

export const PostCardCompact: React.FC<{ post: Post; locale: string; className?: string }> = ({
  post,
  locale,
  className,
}) => {
  const image = getPostImage(post)
  const href = `/${locale}/posts/${post.slug}`

  return (
    <article className={`group flex gap-4 border-b border-border pb-6 ${className || ''}`}>
      <Link href={href} className="relative block h-28 w-24 shrink-0 overflow-hidden bg-card">
        {image && <Media resource={image}
            alt={post.title} imgClassName="object-cover h-28 w-24" />}
      </Link>
      <div className="min-w-0 space-y-2">
        <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
        <h3 className="line-clamp-3 font-serif text-[22px] leading-[1.15]">
          <Link href={href} className="hover:opacity-70">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  )
}
