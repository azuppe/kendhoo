import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatRelativeTime } from '@/utilities/formatRelativeTime'
import { getPostSource } from './utils'

export const PostSourceLine: React.FC<{ post: Post; variant?: 'light' | 'dark' }> = ({
  post,
  variant = 'light',
}) => {
  const source = getPostSource(post)
  const isDark = variant === 'dark'

  return (
    <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
      {source?.logo && typeof source.logo === 'object' && (
        <span className="relative block h-5 w-5 overflow-hidden rounded-full border border-gray-200 shrink-0">
          <Media resource={source.logo} imgClassName="object-cover h-5 w-5" />
        </span>
      )}
      {source?.name && (
        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>{source.name}</span>
      )}
      {source?.name && post.publishedAt && <span aria-hidden>&bull;</span>}
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

  return (
    <div className="flex items-center gap-2 text-xs">
      {typeof category === 'object' && category?.title && (
        <span className={variant === 'dark' ? 'font-semibold text-red-400' : 'font-semibold text-red-600'}>
          {category.title}
        </span>
      )}
      {typeof category === 'object' && category?.title && <span aria-hidden>&bull;</span>}
      <span className={variant === 'dark' ? 'text-white/70' : 'text-gray-500'}>
        {readTimeMinutes} min read
      </span>
    </div>
  )
}
