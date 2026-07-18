import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { Comments } from '@/components/Comments'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPost({ slug, locale })

  if (!post) return <PayloadRedirects url={url} />

  // Filter related posts for sidebar
  const relatedPosts = post.relatedPosts?.filter((p) => typeof p === 'object') || [];

  return (
    <article className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Article */}
        <div>
          <PostHero post={post} />
          <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <RichText
              className="prose max-w-none"
              content={post.content}
              enableGutter={false}
            />
          </div>

          <Comments postId={post.id} />
        </div>

        {/* Related News */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Related News</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">See all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.slice(0, 3).map((related, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  {/* Image */}
                  {related.meta?.image && typeof related.meta.image !== 'string' && (
                    <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={related.meta.image.url || undefined}
                        alt={related.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {/* Category badge */}
                    {Array.isArray(related.categories) && related.categories.length > 0 && (
                      <span className="inline-block mb-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-pink-100 text-pink-600">
                        {typeof related.categories[0] === 'object' ? related.categories[0].title : ''}
                      </span>
                    )}
                    <div className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                      {related.title}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <span>2.5m</span>
                      <span>•</span>
                      <span>{related.publishedAt ? new Date(related.publishedAt).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  const post = await queryPost({ slug, locale })

  return generateMeta({ doc: post })
}

const queryPost = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
