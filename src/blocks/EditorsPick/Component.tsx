import React from 'react'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload, TypedLocale } from 'payload'

import type { Post, EditorsPickBlock as EditorsPickBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/PostsMagazine/SectionHeader'
import { PostSourceLine, PostFooterLine } from '@/components/PostsMagazine/PostMeta'
import { PostCard } from '@/components/PostsMagazine/PostCard'
import { formatReadTime, getPostImage } from '@/components/PostsMagazine/utils'

export const EditorsPickBlock: React.FC<
  EditorsPickBlockProps & {
    id?: string
    locale: TypedLocale
  }
> = async ({ heading, featuredPost, posts, locale }) => {
  if (!featuredPost || !posts?.length) return null

  const unresolvedIds = [
    ...(typeof featuredPost === 'object' ? [] : [featuredPost]),
    ...posts.filter((post) => typeof post !== 'object'),
  ] as (string | number)[]

  const resolvedById = new Map<string | number, Post>()

  if (unresolvedIds.length > 0) {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 2,
      locale,
      limit: unresolvedIds.length,
      where: {
        id: {
          in: unresolvedIds,
        },
      },
    })

    for (const doc of docs) {
      resolvedById.set(doc.id, doc)
    }
  }

  const resolvedFeatured =
    typeof featuredPost === 'object' ? featuredPost : resolvedById.get(featuredPost)

  const resolvedPosts = posts
    .map((post) => (typeof post === 'object' ? post : resolvedById.get(post)))
    .filter((post): post is Post => Boolean(post))
    .slice(0, 4)

  if (!resolvedFeatured) return null

  const featuredImage = getPostImage(resolvedFeatured)
  const featuredHref = `/${locale}/posts/${resolvedFeatured.slug}`

  return (
    <div className="container mx-auto px-4">
      <SectionHeader title={heading || 'Editor’s Pick'} href={`/${locale}/posts`} />

      <Link
        href={featuredHref}
        className="relative block aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-900 mb-6"
      >
        {featuredImage && (
          <Media resource={featuredImage} imgClassName="object-cover w-full h-full aspect-[21/9]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 space-y-2 text-white max-w-2xl">
          <PostSourceLine post={resolvedFeatured} variant="dark" />
          <h3 className="text-xl lg:text-3xl font-bold leading-tight">{resolvedFeatured.title}</h3>
          {resolvedFeatured.meta?.description && (
            <p className="text-sm lg:text-base text-white/80 line-clamp-2">
              {resolvedFeatured.meta.description}
            </p>
          )}
          <PostFooterLine
            post={resolvedFeatured}
            readTimeMinutes={formatReadTime(resolvedFeatured)}
            variant="dark"
          />
        </div>
      </Link>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {resolvedPosts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}

export default EditorsPickBlock
