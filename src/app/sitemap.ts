import type { MetadataRoute } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import localization from '@/i18n/localization'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online'
const locales = localization.locales.map((locale) => locale.code)

const localizedEntries = (path: string, priority: number): MetadataRoute.Sitemap => {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified: new Date(),
    priority,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  const [pages, posts, events, activities] = await Promise.all([
    payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'posts',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'events',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'activities',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
  ])

  const staticEntries = [
    ...localizedEntries('', 1),
    ...localizedEntries('/posts', 0.8),
    ...localizedEntries('/events', 0.8),
    ...localizedEntries('/things-to-do', 0.8),
  ]

  const pageEntries = pages.docs
    .filter((doc) => doc.slug !== 'home')
    .flatMap((doc) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        priority: 0.6,
      })),
    )

  const postEntries = posts.docs.flatMap((doc) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/posts/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      priority: 0.7,
    })),
  )

  const eventEntries = events.docs.flatMap((doc) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/events/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      priority: 0.6,
    })),
  )

  const activityEntries = activities.docs.flatMap((doc) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/things-to-do/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      priority: 0.6,
    })),
  )

  return [...staticEntries, ...pageEntries, ...postEntries, ...eventEntries, ...activityEntries]
}
