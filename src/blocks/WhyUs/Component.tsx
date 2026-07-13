import React from 'react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type WhyUsItem = {
  image: any
  title: string
  description?: string | null
}

export type WhyUsBlockProps = {
  title?: string | null
  items: WhyUsItem[]
  ctaTitle?: string | null
  ctaDescription?: string | null
  ctaLink?: { link: any }[] | null
}

export const WhyUsBlock: React.FC<WhyUsBlockProps> = ({
  title,
  items,
  ctaTitle,
  ctaDescription,
  ctaLink,
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {title && (
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-16">
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2" />

          <div className="flex flex-col gap-20">
            {items?.map((item, i) => {
              const isImageFirst = i % 2 === 0
              const imageEl = (
                <div className="relative">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                  <div className="relative overflow-hidden rounded-2xl">
                    <Media
                      resource={item.image}
                      imgClassName="w-full h-56 object-cover"
                      className="w-full h-56"
                    />
                  </div>
                </div>
              )
              const textEl = (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              )

              return (
                <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <span className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-700 dark:bg-gray-200 ring-4 ring-white dark:ring-gray-950 z-10" />
                  {isImageFirst ? imageEl : textEl}
                  {isImageFirst ? textEl : imageEl}
                </div>
              )
            })}
          </div>
        </div>

        {(ctaTitle || ctaDescription || (ctaLink && ctaLink.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mt-24">
            {ctaTitle && (
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                {ctaTitle}
              </h3>
            )}
            <div>
              {ctaDescription && (
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {ctaDescription}
                </p>
              )}
              {ctaLink?.[0]?.link && (
                <CMSLink
                  className="inline-flex rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-medium"
                  {...ctaLink[0].link}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
