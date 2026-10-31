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
      <SectionHeader title="Must read" href={`/${locale}/posts`} />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <PostCardCompact post={left} locale={locale} />
        </div>

        <Link href={centerHref} className="group block space-y-6 lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-card">
            {centerImage && (
              <Media
                resource={centerImage}
                alt={center.title}
                imgClassName="object-cover w-full h-full aspect-[4/3] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              />
            )}
          </div>
          <div className="space-y-3 text-center">
            <PostFooterLine post={center} readTimeMinutes={formatReadTime(center)} />
            <h3 className="font-serif text-4xl leading-[1.05]">{center.title}</h3>
            <div className="flex justify-center">
              <PostSourceLine post={center} />
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-6 lg:col-span-3">
          {rightPosts.map((post) => (
            <PostCardCompact key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  )
}
