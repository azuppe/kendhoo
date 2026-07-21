import React from 'react'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload, TypedLocale } from 'payload'
import { ArrowUpRight } from 'lucide-react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { PostSourceLine, PostFooterLine } from '@/components/PostsMagazine/PostMeta'
import { formatReadTime, getPostImage } from '@/components/PostsMagazine/utils'

export type FeaturedPostBlockProps = {
  post?: (number | string | Post) | null
  locale: TypedLocale
}

export const FeaturedPostBlock: React.FC<FeaturedPostBlockProps> = async ({ post, locale }) => {
  if (!post) return null

  const resolvedPost =
    typeof post === 'object'
      ? post
      : await (
          await getPayload({ config: configPromise })
        ).findByID({
          collection: 'posts',
          id: post,
          depth: 2,
          locale,
        })

  if (!resolvedPost) return null

  const image = getPostImage(resolvedPost)
  const href = `/${locale}/posts/${resolvedPost.slug}`

  return (
    <div className="container mx-auto px-4">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Link
          href={href}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100"
        >
          {image && <Media resource={image} imgClassName="object-cover w-full h-full" />}
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white shadow-lg">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
        <div className="space-y-3">
          <PostSourceLine post={resolvedPost} />
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            <Link href={href}>{resolvedPost.title}</Link>
          </h2>
          {resolvedPost.meta?.description && (
            <p className="text-gray-600 line-clamp-3">{resolvedPost.meta.description}</p>
          )}
          <PostFooterLine post={resolvedPost} readTimeMinutes={formatReadTime(resolvedPost)} />
        </div>
      </article>
    </div>
  )
}
