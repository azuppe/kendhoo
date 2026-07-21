import React from 'react'

import { Media } from '@/components/Media'

export type PhotoGalleryBlockProps = {
  images?: any[] | null
}

export const PhotoGalleryBlock: React.FC<PhotoGalleryBlockProps> = ({ images }) => {
  const [img1, img2, img3, img4] = images || []

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {images && images.length > 0 && (
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[380px] rounded-3xl overflow-hidden">
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
      </div>
    </section>
  )
}
