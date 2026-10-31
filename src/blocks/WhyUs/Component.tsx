import React from 'react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type WhyUsItem = {
  image: any
  title: string
  description?: string | null
}

export type WhyUsBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  items: WhyUsItem[]
  ctaTitle?: string | null
  ctaDescription?: string | null
  ctaLink?: { link: any }[] | null
}

export const WhyUsBlock: React.FC<WhyUsBlockProps> = ({
  title,
  titleColor,
  items,
  ctaTitle,
  ctaDescription,
  ctaLink,
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {title && (
          <h2 className={`  text-4xl md:text-5xl font-medium text-start mb-16 ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="flex flex-col gap-20">
            {items?.map((item, i) => {
              const isImageFirst = i % 2 === 0
              const imageEl = (
                <div className="relative">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-none bg-card" />
                  <div className="relative overflow-hidden rounded-none">
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
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              )

              return (
                <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <span className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-border ring-4 ring-background z-10" />
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
              <h3 className="text-4xl md:text-5xl font-medium text-foreground">
                {ctaTitle}
              </h3>
            )}
            <div>
              {ctaDescription && (
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {ctaDescription}
                </p>
              )}
              {ctaLink?.[0]?.link && (
                <CMSLink
                  className="inline-flex rounded-none bg-foreground text-background px-7 py-3 font-medium hover:opacity-80 transition-colors"
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
