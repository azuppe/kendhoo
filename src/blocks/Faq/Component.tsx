'use client'

import React, { useId, useState } from 'react'
import { Plus } from 'lucide-react'

import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqBlockProps = {
  badge?: string
  title?: string
  titleColor?: ('dark' | 'light') | null
  titleAccent?: string
  email?: string
  ctaLabel?: string
  ctaLink?: string
  items: FaqItem[]
  image?: any
  imageCaption?: string
  signatureName?: string
  signatureTagline?: string
}

export const FaqBlock: React.FC<FaqBlockProps> = ({
  badge,
  title,
  titleColor,
  titleAccent,
  email,
  ctaLabel,
  ctaLink,
  items,
  image,
  imageCaption,
  signatureName,
  signatureTagline,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const uid = useId()
  const hasImage = image && typeof image === 'object'

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-20 flex flex-col items-center text-center">
          {badge && <span className="eyebrow-brass mb-6">{badge}</span>}
          {title && (
            <h2 className={`max-w-3xl text-5xl leading-[1.04] md:text-7xl ${getTitleColorClass(titleColor)}`}>
              {title}
            </h2>
          )}
          {titleAccent && (
            <p className={`mt-2 max-w-3xl font-serif text-5xl italic leading-[1.04] md:text-7xl ${getTitleColorClass(titleColor)}`}>
              {titleAccent}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 items-start gap-16 ${hasImage ? 'lg:grid-cols-2' : 'mx-auto max-w-3xl'}`}>
          <div className="flex flex-col gap-10">
            <div className="border-t border-foreground">
              {items?.map((item, idx) => {
                const isOpen = openIndex === idx
                const panelId = `${uid}-panel-${idx}`
                return (
                  <div key={idx} className="border-b border-border">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-start"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span className="font-serif text-[26px] leading-[1.2]">{item.question}</span>
                        <Plus
                          aria-hidden
                          strokeWidth={1.25}
                          className={`h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      hidden={!isOpen}
                      className="pb-8 pe-12 text-[16px] leading-relaxed text-muted-foreground"
                    >
                      {item.answer}
                    </div>
                  </div>
                )
              })}
            </div>

            {(email || ctaLabel) && (
              <div className="flex flex-wrap items-end justify-between gap-6">
                {email && (
                  <div>
                    <p className="eyebrow mb-1">Email</p>
                    <a href={`mailto:${email}`} className="font-serif text-2xl hover:opacity-70">
                      {email}
                    </a>
                  </div>
                )}
                {ctaLabel && (
                  <a
                    href={ctaLink || `mailto:${email || ''}`}
                    className="inline-flex h-12 items-center border border-foreground px-8 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
                  >
                    {ctaLabel}
                  </a>
                )}
              </div>
            )}
          </div>

          {hasImage && (
            <figure className="relative min-h-[28rem] overflow-hidden bg-card lg:h-full lg:min-h-[36rem]">
              <Media resource={image} fill imgClassName="object-cover" />
              {imageCaption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16 text-[13px] uppercase tracking-[0.16em] text-white">
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>

        {(signatureName || signatureTagline) && (
          <div className="mt-20 flex flex-col items-center text-center">
            {signatureName && <p className="font-serif text-3xl italic">{signatureName}</p>}
            {signatureTagline && <p className="eyebrow mt-2">{signatureTagline}</p>}
          </div>
        )}
      </div>
    </section>
  )
}
