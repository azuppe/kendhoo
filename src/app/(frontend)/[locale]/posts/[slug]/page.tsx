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

import { ReadingProgress } from '@/components/Share/ReadingProgress'
import { PostHero } from '@/heros/PostHero'
import { Comments } from '@/components/Comments'
import { generateMeta } from '@/utilities/generateMeta'
import { JsonLd } from '@/components/JsonLd'
import PageClient from './page.client'
import { TypedLocale } from 'payload'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online'

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

  const coverImage =
    post.coverImage && typeof post.coverImage === 'object'
      ? post.coverImage
      : post.meta?.image && typeof post.meta.image === 'object'
        ? post.meta.image
        : undefined
  const authorName = post.populatedAuthors?.[0]?.name

  return (
    <article id="article" className="min-h-screen pb-16 pt-28">
      <ReadingProgress targetId="article" />
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: post.title,
          description: post.meta?.description || undefined,
          image: coverImage?.url ? [`${baseUrl}${coverImage.url}`] : undefined,
          datePublished: post.publishedAt || undefined,
          dateModified: post.publishedAt || undefined,
          author: authorName ? { '@type': 'Person', name: authorName } : undefined,
          publisher: {
            '@type': 'Organization',
            name: 'Kendhoo Online',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/kendhoo-mark.svg`,
            },
          },
          mainEntityOfPage: `${baseUrl}/${locale}${url}`,
        }}
      />

      <div className="container  mx-auto px-4 md:px-8">
        {/* Main Article */}
        <div>
          <PostHero post={post} />
          <div className="mx-auto mt-20 max-w-2xl">
            <RichText
              className="prose max-w-none prose-lg"
              content={post.content}
              enableGutter={false}
            />
          </div>

          <Comments postId={post.id} />

          {/* More News */}
          {relatedPosts.length > 0 && (
            <div className="mt-32">
              <h2 className="mb-10 border-b border-border pb-5 font-serif text-4xl">Read next</h2>
              <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.slice(0, 3).map((related) => {
                  const image =
                    related.coverImage && typeof related.coverImage === 'object'
                      ? related.coverImage
                      : related.meta?.image && typeof related.meta.image === 'object'
                        ? related.meta.image
                        : undefined

                  return (
                    <Link
                      key={related.id}
                      href={`/${locale}/posts/${related.slug}`}
                      className="group flex flex-col gap-5"
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden bg-card">
                        {image && (
                          <Media
                            resource={image}
                            imgClassName="object-cover w-full h-full aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                      {related.publishedAt && (
                        <span className="eyebrow">
                          {new Date(related.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      <h3 className="font-serif text-[26px] leading-[1.12] group-hover:opacity-70">
                        {related.title}
                      </h3>
                    </Link>
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
