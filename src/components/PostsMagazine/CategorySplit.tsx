import React from 'react'

import type { Post } from '@/payload-types'

import { SectionHeader } from './SectionHeader'
import { PostCard } from './PostCard'

export const CategorySplit: React.FC<{
  title: string
  posts: Post[]
  locale: string
  href?: string
}> = ({ title, posts, locale, href }) => {
  if (!posts.length) return null

  return (
    <div>
      <SectionHeader title={title} href={href} />
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
