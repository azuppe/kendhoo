import type { Metadata } from 'next/types'

import { CategoryNav } from '@/components/CategoryNav'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { HeroFeatured } from '@/components/PostsMagazine/HeroFeatured'
import { LatestNewsGrid } from '@/components/PostsMagazine/LatestNewsGrid'
import { StoryAvatars } from '@/components/PostsMagazine/StoryAvatars'
import { MustRead } from '@/components/PostsMagazine/MustRead'
import { EditorsPick } from '@/components/PostsMagazine/EditorsPick'
import { CategorySplit } from '@/components/PostsMagazine/CategorySplit'
import { NewsletterBanner } from '@/components/PostsMagazine/NewsletterBanner'
import { PostCard, PostCardCompact } from '@/components/PostsMagazine/PostCard'
import { topAuthorsFromPosts } from '@/components/PostsMagazine/utils'
import type { Category, Post } from '@/payload-types'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page({ params, searchParams }: Args) {
  const { locale = 'en' } = await params
  const { category } = await searchParams
  const t = await getTranslations()
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    locale,
    depth: 0,
    limit: 100,
    sort: 'title',
    overrideAccess: false,
  })

  // A category filter shows a plain list of news cards, no magazine layout.
  if (category) {
    const [posts, editorsPickResult] = await Promise.all([
      payload.find({
        collection: 'posts',
        locale,
        depth: 2,
        limit: 12,
        overrideAccess: false,
        where: {
          'categories.slug': {
            equals: category,
          },
        },
      }),
      payload.find({
        collection: 'posts',
        locale,
        depth: 2,
        limit: 5,
        sort: '-publishedAt',
        overrideAccess: false,
        where: {
          and: [{ _status: { equals: 'published' } }, { isEditorsPick: { equals: true } }],
        },
      }),
    ])

    const activeCategory = categories.docs.find((c) => c.slug === category)

    return (
      <div className="pt-32 pb-24">
        <PageClient />
        <div className="container mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {activeCategory?.title || t('posts')}
          </h1>
        </div>
        <div className="mb-8">
          <CategoryNav categories={categories.docs} activeSlug={category} />
        </div>

        <div className="container mb-16">
          <EditorsPick posts={editorsPickResult.docs} locale={locale} />
        </div>

        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.docs.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} category={category} />
          )}
        </div>
      </div>
    )
  }

  const [postsResult, sourcesResult, editorsPickResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      locale,
      depth: 2,
      limit: 30,
      sort: '-publishedAt',
      overrideAccess: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
    }),
    payload.find({
      collection: 'sources',
      locale,
      depth: 1,
      limit: 12,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'posts',
      locale,
      depth: 2,
      limit: 5,
      sort: '-publishedAt',
      overrideAccess: false,
      where: {
        and: [{ _status: { equals: 'published' } }, { isEditorsPick: { equals: true } }],
      },
    }),
  ])

  const posts = postsResult.docs
  let cursor = 0
  const take = (count: number): Post[] => {
    const slice = posts.slice(cursor, cursor + count)
    cursor += slice.length
    return slice
  }

  const heroPost = take(1)[0]
  const heroSidePosts = take(3)
  const latestNewsPosts = take(4)
  const mustReadPosts = take(4)
  const editorsPickPosts = editorsPickResult.docs

  const remainingPosts = posts.slice(cursor)
  const categoryBuckets = new Map<string, { category: Category; posts: Post[] }>()
  for (const post of remainingPosts) {
    const cat = post.categories?.find((c): c is Category => typeof c === 'object')
    if (!cat) continue
    const bucket = categoryBuckets.get(cat.id)
    if (bucket) {
      bucket.posts.push(post)
    } else {
      categoryBuckets.set(cat.id, { category: cat, posts: [post] })
    }
  }
  const categorySections = Array.from(categoryBuckets.values())
    .filter((bucket) => bucket.posts.length >= 2)
    .slice(0, 4)

  const topCreators = topAuthorsFromPosts(posts, 4)

  return (
    <div className="pt-32 pb-24 space-y-16">
      <PageClient />

      <div className="container">
        <div className="rounded-2xl  border border-gray-200 px-6 py-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
            {t('welcome-to-buletin')}
          </p>
          <h1 className="text-lg lg:text-2xl font-semibold text-gray-900 max-w-2xl mx-auto">
            {t.rich('welcome-headline', {
              red: (chunks) => <span className="text-gray-900 font-bold">{chunks}</span>,
            })}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <CategoryNav categories={categories.docs} />
      </div>

      {heroPost && (
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-stretch">
            <HeroFeatured post={heroPost} locale={locale} />
            {heroSidePosts.length > 0 && (
              <div className="flex flex-col justify-between gap-6">
                {heroSidePosts.map((post) => (
                  <PostCardCompact key={post.id} post={post} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {latestNewsPosts.length > 0 && (
        <div className="container">
          <LatestNewsGrid posts={latestNewsPosts} locale={locale} href={`/${locale}/posts`} />
        </div>
      )}

      {sourcesResult.docs.length > 0 && (
        <div className="container">
          <StoryAvatars sources={sourcesResult.docs} />
        </div>
      )}

      <div className="container">
        <MustRead posts={mustReadPosts} locale={locale} />
      </div>

      <div className="container">
        <EditorsPick posts={editorsPickPosts} locale={locale} />
      </div>

      {categorySections.length > 0 && (
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {categorySections.map(({ category: cat, posts: catPosts }) => (
            <CategorySplit
              key={cat.id}
              title={cat.title}
              posts={catPosts.slice(0, 2)}
              locale={locale}
              href={`/${locale}/posts?category=${cat.slug}`}
            />
          ))}
        </div>
      )}

      <div className="container">
        <NewsletterBanner />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
