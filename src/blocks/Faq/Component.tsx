'use client'

import React, { useState } from 'react'
import { Mail, Plus } from 'lucide-react'

import { Media } from '@/components/Media'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqBlockProps = {
  badge?: string
  title?: string
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

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="  mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          {badge && (
            <span className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 mb-6">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight text-start">
              {title}
            </h2>
          )}
          {titleAccent && (
            <p className="font-serif italic text-4xl md:text-6xl text-gray-900 leading-tight">
              {titleAccent}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl bg-white shadow-sm p-6 flex flex-col gap-6">
            {(email || ctaLabel) && (
              <div className="flex items-center justify-between gap-4">
                <div>
                  {email && (
                    <>
                      <p className="text-xs text-gray-400 mb-1">Email</p>
                      <p className="font-semibold text-gray-900">{email}</p>
                    </>
                  )}
                </div>
                {ctaLabel && (
                  <a
                    href={ctaLink || `mailto:${email || ''}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-3 text-sm font-semibold shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    {ctaLabel}
                  </a>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {items?.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div key={idx} className="rounded-xl bg-gray-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <span
                        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {image && typeof image === 'object' && (
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[26rem]">
              <Media resource={image} fill imgClassName="object-cover" />
              {imageCaption && (
                <>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-sm font-medium">
                    {imageCaption}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {(signatureName || signatureTagline) && (
          <div className="flex flex-col items-center text-center mt-14">
            {signatureName && (
              <p className="font-serif italic text-3xl text-gray-900">{signatureName}</p>
            )}
            {signatureTagline && (
              <p className="text-xs tracking-widest text-gray-500 uppercase mt-1">
                {signatureTagline}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
