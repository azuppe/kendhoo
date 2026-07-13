import React from 'react'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { Media } from '@/components/Media'

export type BusinessDirectoryBlockProps = {
  title?: string | null
  category?: 'all' | 'restaurant' | 'shop' | 'accommodation' | 'service' | null
  island?: any
  featuredOnly?: boolean | null
  limit?: number | null
  locale: TypedLocale
}

export const BusinessDirectoryBlock: React.FC<BusinessDirectoryBlockProps> = async ({
  title,
  category = 'all',
  island,
  featuredOnly,
  limit = 8,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const islandId = typeof island === 'object' && island ? island.id : island

  const { docs: businesses } = await payload.find({
    collection: 'businesses' as any,
    depth: 1,
    locale,
    limit: limit || 8,
    where: {
      and: [
        ...(category && category !== 'all' ? [{ category: { equals: category } }] : []),
        ...(islandId ? [{ island: { equals: islandId } }] : []),
        ...(featuredOnly ? [{ featured: { equals: true } }] : []),
      ],
    },
  })

  if (!businesses?.length) return null

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((biz: any) => (
            <article
              key={biz.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow"
            >
              {biz.image && (
                <div className="h-40 bg-gray-100 dark:bg-gray-800">
                  <Media resource={biz.image} imgClassName="w-full h-40 object-cover" />
                </div>
              )}
              <div className="p-4">
                {typeof biz.rating === 'number' && (
                  <p className="text-xs text-amber-500 mb-1">{'★'.repeat(Math.round(biz.rating))}</p>
                )}
                <h3 className="text-base font-bold mb-1">{biz.name}</h3>
                {biz.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                    {biz.description}
                  </p>
                )}
                {biz.hours && <p className="text-xs text-gray-500">🕐 {biz.hours}</p>}
                {biz.phone && <p className="text-xs text-gray-500">📞 {biz.phone}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
