import type { Metadata } from 'next'

import Link from 'next/link'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
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
    <article className="pt-32 pb-16  min-h-screen">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <div className="container  mx-auto px-4 md:px-8">
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

          {/* More News */}
          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">More News</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related) => {
                  const image =
                    related.coverImage && typeof related.coverImage === 'object'
                      ? related.coverImage
                      : related.meta?.image && typeof related.meta.image === 'object'
                        ? related.meta.image
                        : undefined

                  return (
                    <div
                      key={related.id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
                    >
                      <div className="w-full aspect-[16/10] bg-gray-100">
                        {image && (
                          <Media
                            resource={image}
                            imgClassName="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-sm text-gray-500 mb-2">
                          {related.publishedAt &&
                            new Date(related.publishedAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4">
                          {related.title}
                        </h3>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <Link
                            href={`/${locale}/posts/${related.slug}`}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
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
