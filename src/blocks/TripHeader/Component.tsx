import React from 'react'
import { Calendar, Hotel, Plane, Star } from 'lucide-react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Breadcrumb = {
  label: string
  url?: string | null
}

type IncludeItem = {
  icon?: 'flight' | 'hotels' | 'events' | null
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
  priceCard?: PriceCard | null
}


export const TripHeaderBlock: React.FC<TripHeaderBlockProps> = ({
  images,
  breadcrumbs,
  title,
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
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                {crumb.url ? (
                  <a href={crumb.url} className="hover:text-gray-800">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {title}
            </h1>
          </div>

         
        </div>
      </div>
    </section>
  )
}
