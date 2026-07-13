import React from 'react'
import * as Icons from 'lucide-react'
import { Star, MapPin } from 'lucide-react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

const Icon: React.FC<{ name?: string | null; className?: string }> = ({ name, className }) => {
  const IconComp =
    (name && (Icons as unknown as Record<string, React.ElementType>)[name]) || MapPin
  return <IconComp className={className} />
}

export const EventDetailsHero: React.FC<Page['hero']> = ({
  title,
  media,
  badge,
  category,
  tripCode,
  description,
  quickStats,
  galleryImages,
  priceBox,
  links,
}) => {
  const leftImages = galleryImages?.slice(0, 2) || []
  const rightImages = galleryImages?.slice(2, 4) || []
  const bookLink = links?.[0]?.link

  return (
    <div className="w-full">
      {/* Gallery mosaic */}
      <div className="grid grid-cols-4 gap-2 h-[260px] md:h-[420px]">
        <div className="col-span-1 grid grid-rows-2 gap-2">
          {leftImages.map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-100">
              {item.image && typeof item.image === 'object' && (
                <Media fill resource={item.image} imgClassName="object-cover" />
              )}
            </div>
          ))}
        </div>

        <div className="col-span-2 relative rounded-2xl overflow-hidden bg-gray-100">
          {media && typeof media === 'object' && (
            <Media fill priority resource={media} imgClassName="object-cover" />
          )}
        </div>

        <div className="col-span-1 grid grid-rows-2 gap-2">
          {rightImages.map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-100">
              {item.image && typeof item.image === 'object' && (
                <Media fill resource={item.image} imgClassName="object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {/* Main info */}
        <div className="lg:col-span-2">
          {(category || tripCode) && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              {category && <span>{category}</span>}
              {category && tripCode && <span>•</span>}
              {tripCode && <span>Trip Code: {tripCode}</span>}
            </div>
          )}

          {title && (
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
          )}

          {description && (
            <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">{description}</p>
          )}

          {Array.isArray(quickStats) && quickStats.length > 0 && (
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              {quickStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon name={stat.icon} className="w-5 h-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price box */}
        {priceBox?.price != null && (
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
              {badge && (
                <span className="inline-block mb-4 px-3 py-1 text-xs font-bold rounded-full bg-gray-900 text-white">
                  {badge}
                </span>
              )}

              <div className="flex items-baseline gap-2 mb-1">
                {priceBox.durationLabel && (
                  <span className="text-2xl font-extrabold text-gray-900">
                    {priceBox.durationLabel}
                  </span>
                )}
              </div>
              {priceBox.route && <p className="text-sm text-gray-500 mb-4">{priceBox.route}</p>}

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-extrabold text-gray-900">
                  {priceBox.currency} ${priceBox.price?.toLocaleString()}
                </span>
                {priceBox.originalPrice != null && (
                  <span className="text-sm text-gray-400 line-through">
                    ${priceBox.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 text-xs text-gray-500 mb-4">
                {priceBox.validOn && <span>Valid on <strong>{priceBox.validOn}</strong></span>}
                {tripCode && <span>Trip Code: {tripCode}</span>}
                {priceBox.rating != null && (
                  <span className="flex items-center gap-1 text-gray-700">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {priceBox.rating}
                    {priceBox.reviewCount != null && (
                      <span className="text-gray-500">({priceBox.reviewCount} reviews)</span>
                    )}
                  </span>
                )}
              </div>

              {Array.isArray(priceBox.includes) && priceBox.includes.length > 0 && (
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 mb-4">
                  {priceBox.includes.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1">
                      <Icon name={item.icon} className="w-5 h-5 text-gray-500" />
                      <span className="text-[11px] text-gray-500 leading-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {bookLink?.url ? (
                <CMSLink
                  {...bookLink}
                  appearance="default"
                  className="!w-full !flex !justify-center !bg-gray-900 hover:!bg-gray-800"
                />
              ) : (
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 transition-colors"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetailsHero
