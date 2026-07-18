import React from 'react'
import { Calendar, Clock3, Gauge, Hotel, Plane, Star, Users } from 'lucide-react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Breadcrumb = {
  label: string
  url?: string | null
}

type MetaItem = {
  icon?: 'duration' | 'groupSize' | 'pacing' | 'accommodation' | null
  label?: string | null
  sublabel?: string | null
}

type IncludeItem = {
  icon?: 'flight' | 'hotels' | 'tours' | null
  label?: string | null
  sublabel?: string | null
}

type PriceCard = {
  badge?: string | null
  durationLabel?: string | null
  route?: string | null
  price: number
  originalPrice?: number | null
  currency?: string | null
  validOn?: string | null
  tripCode?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  includes?: IncludeItem[] | null
}

export type TripHeaderBlockProps = {
  images?: any[] | null
  breadcrumbs?: Breadcrumb[] | null
  title: string
  rating?: number | null
  reviewCount?: number | null
  meta?: MetaItem[] | null
  priceCard?: PriceCard | null
}

const metaIcons = {
  duration: Clock3,
  groupSize: Users,
  pacing: Gauge,
  accommodation: Hotel,
}

const includeIcons = {
  flight: Plane,
  hotels: Hotel,
  tours: Calendar,
}

export const TripHeaderBlock: React.FC<TripHeaderBlockProps> = ({
  images,
  breadcrumbs,
  title,
  rating,
  reviewCount,
  meta,
  priceCard,
}) => {
  const [img1, img2, img3, img4] = images || []

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {images && images.length > 0 && (
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[380px] rounded-3xl overflow-hidden mb-8">
            {img1 && (
              <div className="relative col-span-1 row-span-2">
                <Media resource={img1} fill imgClassName="object-cover" />
              </div>
            )}
            {img2 && (
              <div className="relative col-span-2 row-span-2">
                <Media resource={img2} fill imgClassName="object-cover" />
              </div>
            )}
            {img3 && (
              <div className="relative col-span-1 row-span-1">
                <Media resource={img3} fill imgClassName="object-cover" />
              </div>
            )}
            {img4 && (
              <div className="relative col-span-1 row-span-1">
                <Media resource={img4} fill imgClassName="object-cover" />
              </div>
            )}
          </div>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                {crumb.url ? (
                  <a href={crumb.url} className="hover:text-gray-800 dark:hover:text-gray-200">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {title}
            </h1>

            {rating != null && (
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {reviewCount != null && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {reviewCount} reviews
                  </span>
                )}
              </div>
            )}

            {meta && meta.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                {meta.map((item, i) => {
                  const Icon = metaIcons[item.icon || 'duration']
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <Icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                          {item.label}
                        </p>
                        {item.sublabel && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                            {item.sublabel}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {priceCard && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                {priceCard.badge && (
                  <span className="inline-block px-2.5 py-1 rounded-md bg-gray-900 text-white text-[10px] font-bold tracking-wide mb-3">
                    {priceCard.badge}
                  </span>
                )}

                {priceCard.durationLabel && (
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {priceCard.durationLabel}
                  </p>
                )}
                {priceCard.route && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{priceCard.route}</p>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                    {priceCard.currency} ${priceCard.price?.toLocaleString()}
                  </span>
                  {priceCard.originalPrice != null && (
                    <span className="text-sm text-gray-400 line-through">
                      ${priceCard.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>

                {priceCard.validOn && (
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Valid on {priceCard.validOn}
                  </p>
                )}
                {priceCard.tripCode && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                    Trip Code: {priceCard.tripCode}
                  </p>
                )}

                {priceCard.includes && priceCard.includes.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {priceCard.includes.map((inc, i) => {
                      const Icon = includeIcons[inc.icon || 'flight']
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center gap-1 rounded-xl border border-gray-100 dark:border-gray-800 py-3 px-1"
                        >
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight">
                            {inc.label}
                          </span>
                          {inc.sublabel && (
                            <span className="text-[10px] text-gray-400 leading-tight">
                              {inc.sublabel}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                <CMSLink
                  url={priceCard.buttonUrl || '#'}
                  label={priceCard.buttonLabel || 'Book Now'}
                  appearance="default"
                  className="w-full flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3 transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
