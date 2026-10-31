import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'

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
  const byline = (heroPost.populatedAuthors || [])
    .map((a) => a?.name)
    .filter((n): n is string => !!n)
    .join(', ')

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col gap-8 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xs space-y-3">
            {badge && <span className="eyebrow-brass block">{badge}</span>}
            {subtitle && <p className="text-[15px] text-muted-foreground">{subtitle}</p>}
          </div>
          {heading && <h2 className="text-5xl leading-[1.04] md:text-6xl lg:max-w-2xl">{heading}</h2>}
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
          <Link href={postHref(heroPost, locale)} className="group block lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-card sm:aspect-[5/4]">
              {heroPost.meta?.image && (
                <Media
                  resource={heroPost.meta.image}
                  alt={heroPost.title}
                  fill
                  imgClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />
              )}
            </div>
            <div className="mt-8 space-y-4">
              {byline && <p className="eyebrow">{byline}</p>}
              <h3 className="line-clamp-3 text-4xl leading-[1.05] md:text-5xl">{heroPost.title}</h3>
              {heroPost.meta?.description && (
                <p className="line-clamp-3 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                  {heroPost.meta.description}
                </p>
              )}
            </div>
          </Link>

          <div className="flex flex-col gap-12 lg:col-span-5">
            {!!thumbPosts.length && (
              <div className="grid grid-cols-2 gap-6">
                {thumbPosts.map((post) => (
                  <Link key={post.id} href={postHref(post, locale)} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-card">
                      {post.meta?.image && (
                        <Media
                          resource={post.meta.image}
                          alt={post.title}
                          fill
                          imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 line-clamp-3 text-[22px] leading-[1.15] group-hover:opacity-70">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}

            {quotePost && (
              <div className="border-t border-foreground pt-8">
                <p className="font-serif text-[28px] italic leading-[1.3]">
                  {quotePost.meta?.description || quotePost.title}
                </p>
                <Link
                  href={postHref(quotePost, locale)}
                  className="link-luxe mt-6 inline-block hover:opacity-70"
                >
                  Read more
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
