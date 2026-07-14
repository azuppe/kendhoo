import React from 'react'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { Star, Heart } from 'lucide-react'
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

            return (
              <article
                key={biz.id}
                className="relative h-[420px] rounded-3xl overflow-hidden bg-gray-900 flex flex-col justify-end"
              >
                {biz.image && (
                  <Media resource={biz.image} fill imgClassName="object-cover" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <span
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
                    isOpen ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  {isOpen ? 'Open' : 'Closed'}
                </span>

                <button
                  type="button"
                  aria-label="Save"
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-500 hover:text-red-500 shadow transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>

                <div className="relative px-5 pb-5">
                  {typeof biz.rating === 'number' && (
                    <div className="flex items-center gap-1 text-white font-semibold mb-1.5">
                      <Star className="w-4 h-4 fill-white text-white" />
                      {biz.rating}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-1.5">{biz.name}</h3>

                  {biz.description && (
                    <p className="text-sm text-white/80 line-clamp-3 mb-4">{biz.description}</p>
                  )}

                  <button
                    type="button"
                    className="w-full rounded-full bg-white text-gray-900 font-semibold py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
