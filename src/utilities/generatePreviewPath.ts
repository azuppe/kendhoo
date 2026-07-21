import { CollectionSlug, TypedLocale } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  events: '/events',
  activities: '/things-to-do',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  locale: string
}

export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  const path = `/${locale}${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
