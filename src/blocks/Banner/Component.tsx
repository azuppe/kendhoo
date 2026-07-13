import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Plane } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({
  className,
  content,
  style,
  backgroundImage,
  logo,
  tagline,
}) => {
  if (style === 'promo') {
    return (
      <div className={cn('mx-auto my-8 w-full', className)}>
        <div className="relative w-full h-56 md:h-72 overflow-hidden bg-black">
          {backgroundImage && typeof backgroundImage === 'object' && (
            <Media
              fill
              imgClassName="object-cover"
              resource={backgroundImage}
              className="absolute inset-0"
            />
          )}

          <div
            className="absolute inset-y-0 left-0 w-[64%] md:w-[58%] bg-black/85"
            style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)' }}
          />

          <div className="relative h-full flex flex-col justify-between p-6 md:p-8 max-w-[60%] md:max-w-[50%]">
            {logo && typeof logo === 'object' && (
              <Media
                resource={logo}
                imgClassName="h-6 md:h-8 w-auto object-contain brightness-0 invert"
                className="w-fit"
              />
            )}

            <RichText
              className="text-white font-extrabold uppercase leading-tight text-2xl md:text-4xl [&_p]:my-0 [&_*]:underline-offset-8"
              content={content}
              enableGutter={false}
              enableProse={false}
            />

            {tagline && (
              <div className="flex items-center gap-2 text-white">
                <Plane className="w-4 h-4 shrink-0" />
                <span>{tagline}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info',
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText content={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
