import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale, Where } from 'payload'
import React from 'react'
import { getTranslations } from 'next-intl/server'

import { Media } from '@/components/Media'
import { Search, type SearchFilters } from '@/search/Component'
import type { Media as MediaType } from '@/payload-types'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<Partial<Record<keyof SearchFilters, string>>>
  params: Promise<{
    locale: TypedLocale
  }>
}

const DATE = /^\d{4}-\d{2}-\d{2}$/

export default async function Page({
  searchParams: searchParamsPromise,
  params: paramsPromise,
}: Args) {
  const sp = await searchParamsPromise
  const { locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const t = await getTranslations()

  const filters: SearchFilters = {
    q: (sp.q || '').slice(0, 120),
    type: sp.type === 'posts' || sp.type === 'events' ? sp.type : '',
    category: sp.category || '',
    from: DATE.test(sp.from || '') ? (sp.from as string) : '',
    to: DATE.test(sp.to || '') ? (sp.to as string) : '',
  }
  const hasFilters = Object.values(filters).some(Boolean)

  const and: Where[] = []
  if (filters.q) {
    and.push({
      or: [
        { title: { like: filters.q } },
        { 'meta.description': { like: filters.q } },
        { 'meta.title': { like: filters.q } },
        { slug: { like: filters.q } },
      ],
    })
  }
  if (filters.type) and.push({ 'doc.relationTo': { equals: filters.type } })
  if (filters.category) and.push({ 'categories.categoryID': { equals: filters.category } })
  if (filters.from) and.push({ publishedAt: { greater_than_equal: `${filters.from}T00:00:00+05:00` } })
  if (filters.to) and.push({ publishedAt: { less_than_equal: `${filters.to}T23:59:59+05:00` } })

  const [results, categories] = await Promise.all([
    payload.find({
      collection: 'search',
      depth: 1,
      limit: 24,
      locale,
      sort: '-publishedAt',
      ...(and.length ? { where: { and } } : {}),
    }),
    payload.find({ collection: 'categories', locale, depth: 0, limit: 100, sort: 'title' }),
  ])

  return (
    <div className="container mx-auto px-4 pb-24 pt-36 md:px-8">
      <PageClient />
      <h1 className="sr-only">{t('search')}</h1>
      <Search
        initial={filters}
        locale={locale}
        categories={categories.docs.map((c) => ({ id: String(c.id), title: c.title }))}
      />

      <p className="eyebrow mt-16 border-b border-border pb-4" aria-live="polite">
        {hasFilters ? `${results.totalDocs} result${results.totalDocs === 1 ? '' : 's'}` : 'Latest'}
      </p>

      {results.docs.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {results.docs.map((r) => {
            const image = r.meta?.image && typeof r.meta.image === 'object' ? (r.meta.image as MediaType) : null
            const kind = r.doc.relationTo
            const href = `/${locale}/${kind}/${r.slug}`
            const cat = r.categories?.[0]?.title
            return (
              <li key={r.id} className="group">
                <a href={href} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-card">
                    {image && (
                      <Media
                        resource={image}
                        imgClassName="object-cover w-full h-full aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="eyebrow-brass mt-5">{[kind === 'events' ? 'Event' : 'News', cat].filter(Boolean).join(' · ')}</p>
                  <h2 className="mt-3 font-serif text-[26px] leading-[1.12] group-hover:opacity-70">{r.title}</h2>
                  {r.meta?.description && (
                    <p className="mt-3 line-clamp-2 text-[15px] text-muted-foreground">{r.meta.description}</p>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-16 max-w-md space-y-4">
          <p className="font-serif text-3xl">Nothing found.</p>
          <p className="text-muted-foreground">Try fewer words, or clear a filter.</p>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | Kendhoo Online`,
    robots: {
      index: false,
      follow: true,
    },
  }
}
