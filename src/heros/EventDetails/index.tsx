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
            <div key={i} className="relative rounded-none overflow-hidden bg-card">
              {item.image && typeof item.image === 'object' && (
                <Media fill resource={item.image} imgClassName="object-cover" />
              )}
            </div>
          ))}
        </div>

        <div className="col-span-2 relative rounded-none overflow-hidden bg-card">
          {media && typeof media === 'object' && (
            <Media fill priority resource={media} imgClassName="object-cover" />
          )}
        </div>

        <div className="col-span-1 grid grid-rows-2 gap-2">
          {rightImages.map((item, i) => (
            <div key={i} className="relative rounded-none overflow-hidden bg-card">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              {category && <span>{category}</span>}
              {category && tripCode && <span>•</span>}
              {tripCode && <span>Trip Code: {tripCode}</span>}
            </div>
          )}

          {title && (
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4">{title}</h1>
          )}

          {description && (
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{description}</p>
          )}

          {Array.isArray(quickStats) && quickStats.length > 0 && (
            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              {quickStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon name={stat.icon} className="w-5 h-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price box */}
        {priceBox?.price != null && (
          <div className="lg:col-span-1">
            <div className="rounded-none border border-border p-6 sticky top-6">
              {badge && (
                <span className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-none bg-foreground text-background">
                  {badge}
                </span>
              )}

              <div className="flex items-baseline gap-2 mb-1">
                {priceBox.durationLabel && (
                  <span className="text-2xl font-medium text-foreground">
                    {priceBox.durationLabel}
                  </span>
                )}
              </div>
              {priceBox.route && <p className="text-sm text-muted-foreground mb-4">{priceBox.route}</p>}

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-medium text-foreground">
                  {priceBox.currency} ${priceBox.price?.toLocaleString()}
                </span>
                {priceBox.originalPrice != null && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${priceBox.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-4">
                {priceBox.validOn && <span>Valid on <strong>{priceBox.validOn}</strong></span>}
                {tripCode && <span>Trip Code: {tripCode}</span>}
                {priceBox.rating != null && (
                  <span className="flex items-center gap-1 text-foreground">
                    <Star className="w-3.5 h-3.5 fill-gray-900 text-foreground" />
                    {priceBox.rating}
                    {priceBox.reviewCount != null && (
                      <span className="text-muted-foreground">({priceBox.reviewCount} reviews)</span>
                    )}
                  </span>
                )}
              </div>

              {Array.isArray(priceBox.includes) && priceBox.includes.length > 0 && (
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-border mb-4">
                  {priceBox.includes.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1">
                      <Icon name={item.icon} className="w-5 h-5 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground leading-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {bookLink?.url ? (
                <CMSLink
                  {...bookLink}
                  appearance="default"
                  className="!w-full !flex !justify-center !h-auto !rounded-none !bg-foreground hover:!bg-black !font-medium !px-7 !py-3"
                />
              ) : (
                <button
                  type="button"
                  className="w-full rounded-none bg-foreground hover:opacity-80 text-background font-medium px-7 py-3 transition-colors"
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
