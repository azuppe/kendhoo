import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export type BlogArchiveBlockProps = {
  badge?: string | null
  subtitle?: string | null
  heading?: string | null
  limit?: number | null
  locale: TypedLocale
}

const postHref = (post: Post, locale: TypedLocale) =>
  generatePreviewPath({
    slug: typeof post.slug === 'string' ? post.slug : '',
    collection: 'posts',
    locale,
  })

export const BlogArchiveBlock: React.FC<BlogArchiveBlockProps> = async ({
  badge,
  subtitle,
  heading,
  limit = 4,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 2,
    locale,
    limit: limit || 4,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  if (!posts?.length) return null

  const [heroPost, ...rest] = posts
  const thumbPosts = rest.slice(0, 2)
  const quotePost = rest[2]

  const heroAuthors = (heroPost.populatedAuthors || [])
    .map((a) => a?.name)
    .filter((n): n is string => !!n)

  return (
    <section className="py-16 bg-gray-50 rounded-3xl">
      <div className="container mx-auto px-4  ">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div className="max-w-xs">
            {badge && (
              <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-gray-900" />
                {badge}
              </span>
            )}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {heading && (
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-start lg:max-w-xl leading-tight text-gray-900">
              {heading}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {heroPost && (
            <Link
              href={postHref(heroPost, locale)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[520px] block"
            >
              {heroPost.meta?.image && (
                <Media
                  resource={heroPost.meta.image}
                  fill
                  imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <ArrowUpRight className="w-5 h-5 text-gray-900" />
              </span>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 line-clamp-2">
                  {heroPost.title}
                </h3>
                {heroPost.meta?.description && (
                  <p className="text-white/85 mb-4 max-w-md line-clamp-2">
                    {heroPost.meta.description}
                  </p>
                )}
                <div className="flex items-center -space-x-3">
                  {heroAuthors.slice(0, 3).map((name, i) => (
                    <span
                      key={i}
                      className="w-9 h-9 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-xs font-bold uppercase"
                    >
                      {name.charAt(0)}
                    </span>
                  ))}
                  <span className="w-9 h-9 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-6">
            {!!thumbPosts.length && (
              <div className="grid grid-cols-2 gap-4">
                {thumbPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={postHref(post, locale)}
                    className="group relative rounded-3xl overflow-hidden aspect-square block bg-gray-100"
                  >
                    {post.meta?.image && (
                      <Media
                        resource={post.meta.image}
                        fill
                        imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center shadow group-hover:rotate-90 transition-transform duration-300">
                      <Plus className="w-4 h-4 text-white" />
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {quotePost && (
              <div>
                <p className="text-2xl md:text-3xl leading-snug font-medium text-gray-900 mb-4">
                  {quotePost.meta?.description || quotePost.title}
                </p>
                <Link
                  href={postHref(quotePost, locale)}
                  className="inline-flex items-center gap-2 font-medium text-gray-900 hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
