import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
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
    <article className={className}>
      <Link href={href} className="block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        {image && <Media resource={image} imgClassName="object-cover w-full h-full aspect-[4/3]" />}
      </Link>
      <div className="pt-3 space-y-2">
        <PostSourceLine post={post} />
        <h3 className="text-sm font-semibold leading-snug text-gray-900">
          <Link href={href}>{post.title}</Link>
        </h3>
        <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
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
    <article className={`flex gap-3 ${className || ''}`}>
      <Link
        href={href}
        className="shrink-0 block w-20 h-20 overflow-hidden rounded-xl bg-gray-100"
      >
        {image && <Media resource={image} imgClassName="object-cover w-20 h-20" />}
      </Link>
      <div className="space-y-1.5 min-w-0">
        <PostSourceLine post={post} />
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
          <Link href={href}>{post.title}</Link>
        </h3>
        <PostFooterLine post={post} readTimeMinutes={formatReadTime(post)} />
      </div>
    </article>
  )
}
