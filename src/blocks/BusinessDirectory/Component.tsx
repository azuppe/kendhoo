import React from 'react'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { Star, Heart, MapPin } from 'lucide-react'
import { Media } from '@/components/Media'

export type BusinessDirectoryBlockProps = {
  title?: string | null
  category?: 'all' | 'restaurant' | 'shop' | 'accommodation' | 'service' | null
  island?: any
  featuredOnly?: boolean | null
  limit?: number | null
  locale: TypedLocale
}

const categoryLabels: Record<string, string> = {
  restaurant: 'Restaurant / Cafe',
  shop: 'Shop',
  accommodation: 'Accommodation',
  service: 'Service',
}

export const BusinessDirectoryBlock: React.FC<BusinessDirectoryBlockProps> = async ({
  title,
  category = 'all',
  island,
  featuredOnly,
  limit = 6,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const islandId = typeof island === 'object' && island ? island.id : island

  const { docs: businesses } = await payload.find({
    collection: 'businesses' as any,
    depth: 1,
    locale,
    limit: limit || 6,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz: any) => {
            const isOpen = (biz.openStatus ?? 'open') === 'open'
            const typeLabel = biz.typeLabel || categoryLabels[biz.category] || null

            return (
              <article key={biz.id} className="flex flex-col">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {biz.image && (
                    <Media resource={biz.image} fill imgClassName="object-cover" />
                  )}

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      isOpen ? 'bg-teal-800' : 'bg-gray-500'
                    }`}
                  >
                    {isOpen ? 'Open' : 'Closed'}
                  </span>

                  <button
                    type="button"
                    aria-label="Save"
                    className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-500 hover:text-red-500 shadow transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-3">
                  {(typeof biz.rating === 'number' || typeLabel) && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {typeof biz.rating === 'number' && (
                        <span className="flex items-center gap-1 text-gray-900 dark:text-gray-100 font-medium">
                          <Star className="w-4 h-4 fill-rose-800 text-rose-800" />
                          {biz.rating}
                          {typeof biz.reviewCount === 'number' && (
                            <span className="text-gray-500 font-normal">({biz.reviewCount})</span>
                          )}
                        </span>
                      )}
                      {typeof biz.rating === 'number' && typeLabel && <span>•</span>}
                      {typeLabel && <span>{typeLabel}</span>}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {biz.name}
                  </h3>

                  {biz.address && (
                    <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {biz.address}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
