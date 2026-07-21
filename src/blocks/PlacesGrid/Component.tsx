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
      <div className="container mx-auto px-4  ">
        {title && (
          <h2 className="  text-4xl md:text-5xl font-bold mb-8 text-start">{title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3">
          {places.map((place: any) => (
            <article
              key={place.id}
              className="group relative aspect-square overflow-hidden bg-gray-900"
            >
              {place.image && (
                <Media
                  resource={place.image}
                  imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white text-center text-base md:text-lg font-bold leading-snug drop-shadow-md">
                  {place.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
