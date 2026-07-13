import React from 'react'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { Media } from '@/components/Media'

export type PlacesGridBlockProps = {
  id?: string
  title?: string | null
  type?: 'thingsToDo' | 'placesToVisit' | 'beach' | null
  island?: any
  limit?: number | null
  locale: TypedLocale
}

export const PlacesGridBlock: React.FC<PlacesGridBlockProps> = async ({
  title,
  type = 'thingsToDo',
  island,
  limit = 6,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const islandId = typeof island === 'object' && island ? island.id : island

  const { docs: places } = await payload.find({
    collection: 'places' as any,
    depth: 1,
    locale,
    limit: limit || 6,
    where: {
      and: [
        { type: { equals: type } },
        ...(islandId ? [{ island: { equals: islandId } }] : []),
      ],
    },
  })

  if (!places?.length) return null

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place: any) => (
            <article
              key={place.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow"
            >
              {place.image && (
                <div className="h-48 bg-gray-100 dark:bg-gray-800">
                  <Media resource={place.image} imgClassName="w-full h-48 object-cover" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{place.name}</h3>
                {place.location?.latitude && place.location?.longitude && (
                  <p className="text-xs text-gray-500 mb-2">
                    📍 {place.location.latitude}, {place.location.longitude}
                  </p>
                )}
                {place.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {place.description}
                  </p>
                )}
                {place.openingHours && (
                  <p className="text-xs text-gray-500 mt-2">🕐 {place.openingHours}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
