import type { Metadata } from 'next/types'

import { CategoryNav } from '@/components/CategoryNav'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { getTranslations, setRequestLocale } from 'next-intl/server'

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

  const posts = await payload.find({
    collection: 'posts',
    locale,
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: category
      ? {
          'categories.slug': {
            equals: category,
          },
        }
      : undefined,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="  max-w-none">
          <h1>{t('posts')}</h1>
        </div>
      </div>

      <div className="mb-8">
        <CategoryNav categories={categories.docs} activeSlug={category} />
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} category={category} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
