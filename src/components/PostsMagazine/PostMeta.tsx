import React from 'react'

import type { Post } from '@/payload-types'

import { formatRelativeTime } from '@/utilities/formatRelativeTime'
import { getPostSource } from './utils'

/** Eyebrow line: source and time, in small widely-spaced caps. */
export const PostSourceLine: React.FC<{ post: Post; variant?: 'light' | 'dark' }> = ({
  post,
  variant = 'light',
}) => {
  const source = getPostSource(post)
  const isDark = variant === 'dark'

  return (
    <div
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.06em] ${
        isDark ? 'text-white/80' : 'text-muted-foreground'
      }`}
    >
      {source?.name && <span>{source.name}</span>}
      {source?.name && post.publishedAt && <span aria-hidden>·</span>}
      {post.publishedAt && <span>{formatRelativeTime(post.publishedAt)}</span>}
    </div>
  )
}

export const PostFooterLine: React.FC<{
  post: Post
  readTimeMinutes: number
  variant?: 'light' | 'dark'
}> = ({ post, readTimeMinutes, variant = 'light' }) => {
  const category = post.categories?.find((c) => typeof c === 'object')
  const hasCategory = typeof category === 'object' && category?.title

  return (
    <div
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.06em] ${
        variant === 'dark' ? 'text-white/80' : 'text-muted-foreground'
      }`}
    >
      {hasCategory && (
        <span className={variant === 'dark' ? 'text-white' : 'text-brass'}>{category.title}</span>
      )}
      {hasCategory && <span aria-hidden>·</span>}
      <span>{readTimeMinutes} min read</span>
    </div>
  )
}
