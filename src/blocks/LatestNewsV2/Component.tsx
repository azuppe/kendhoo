import React from 'react'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { ArrowUpRight } from 'lucide-react'

import type { Category, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export type LatestNewsV2BlockProps = {
  heading?: string | null
  subtitle?: string | null
  link?: any
  limit?: number | null
  locale: TypedLocale
}

const formatMonthYear = (timestamp?: string | null) => {
  if (!timestamp) return ''
  return new Date(timestamp)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    .toUpperCase()
}

const postHref = (post: Post, locale: TypedLocale) =>
  generatePreviewPath({
    slug: typeof post.slug === 'string' ? post.slug : '',
    collection: 'posts',
    locale,
  })

export const LatestNewsV2Block: React.FC<LatestNewsV2BlockProps> = async ({
  heading,
  subtitle,
  link,
  limit = 3,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 2,
    locale,
    limit: limit || 3,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  if (!posts?.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4  ">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="  text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 text-start">
              {heading}
            </h2>
            {subtitle && (
              <p className="text-gray-600 mb-8 max-w-xs">{subtitle}</p>
            )}
            {link?.label && (
              <CMSLink
                {...link}
                appearance="default"
                className="w-fit rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              const category = (post.categories || []).find(
                (c): c is Category => typeof c === 'object' && !!c,
              )

              return (
                <CMSLink
                  key={post.id}
                  type="reference"
                  reference={{ relationTo: 'posts', value: post }}
                  appearance="inline"
                  className="group flex items-start justify-between gap-6 rounded-3xl bg-gray-50 px-8 py-7 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      {category && (
                        <span className="font-bold uppercase tracking-wide text-gray-900">
                          {category.title}
                        </span>
                      )}
                      {category && post.publishedAt && (
                        <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden />
                      )}
                      {post.publishedAt && (
                        <span className="uppercase tracking-wide text-gray-400 font-medium">
                          {formatMonthYear(post.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:underline">
                      {post.meta?.description || post.title}
                    </h3>
                  </div>
                  <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-gray-900 group-hover:shadow transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </CMSLink>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
