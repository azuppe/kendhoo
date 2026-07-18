import React from 'react'

import type { Post } from '@/payload-types'

import { SectionHeader } from './SectionHeader'
import { PostCard } from './PostCard'

export const LatestNewsGrid: React.FC<{ posts: Post[]; locale: string; href?: string }> = ({
  posts,
  locale,
  href,
}) => {
  if (!posts.length) return null

  return (
    <div>
      <SectionHeader title="Latest News" href={href} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
