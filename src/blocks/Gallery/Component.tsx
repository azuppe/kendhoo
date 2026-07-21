import React from 'react'
import { Media } from '@/components/Media'
import { GalleryCoverflow } from './Coverflow'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type GalleryImage = {
  image: any
  caption?: string | null
  location?: string | null
  isVideo?: boolean | null
}

export type GalleryBlockProps = {
  eyebrow?: string | null
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  layout?: 'grid' | 'masonry' | 'slider' | 'coverflow' | null
  images: GalleryImage[]
  viewMoreLabel?: string | null
  viewMoreUrl?: string | null
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  eyebrow,
  title,
  titleColor,
  description,
  layout = 'grid',
  images,
  viewMoreLabel,
  viewMoreUrl,
}) => {
  if (layout === 'coverflow') {
    return (
      <GalleryCoverflow
        eyebrow={eyebrow}
        title={title}
        titleColor={titleColor}
        description={description}
        images={images}
        viewMoreLabel={viewMoreLabel}
        viewMoreUrl={viewMoreUrl}
      />
    )
  }

  const gridClass =
    layout === 'masonry'
      ? 'columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid'
      : layout === 'slider'
        ? 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4'
        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'

  return (
    <section className="py-12">
      <div className="container mx-auto px-4  ">
        {title && (
          <h2 className={`  text-4xl md:text-5xl font-bold mb-8 text-start ${getTitleColorClass(titleColor)}`}>{title}</h2>
        )}
        <div className={gridClass}>
          {images?.map((item, i) => (
            <figure
              key={i}
              className={`overflow-hidden rounded-2xl bg-gray-100 ${
                layout === 'slider' ? 'shrink-0 w-72 snap-start' : ''
              }`}
            >
              <Media
                resource={item.image}
                imgClassName="w-full h-64 object-cover"
                className="w-full h-64"
              />
              {item.caption && (
                <figcaption className="text-sm text-gray-500 px-3 py-2">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
