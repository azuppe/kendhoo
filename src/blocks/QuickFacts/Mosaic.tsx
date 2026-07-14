import React from 'react'
import { Media } from '@/components/Media'

type MosaicFact = {
  label?: string | null
  description?: string | null
  variant?: 'image' | 'color' | null
  image?: any
  color?: 'blue' | 'white' | null
  span?: 'normal' | 'wide' | 'tall' | null
  button?: { label?: string | null; url?: string | null } | null
}

const spanClasses: Record<string, string> = {
  normal: '',
  wide: 'col-span-2',
  tall: 'row-span-2',
}

const colorClasses: Record<string, string> = {
  blue: 'bg-[#5b83ad] text-white',
  white: 'bg-white text-gray-900',
}

export const QuickFactsMosaic: React.FC<{ facts: MosaicFact[] }> = ({ facts }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[220px] sm:auto-rows-[290px] gap-0">
      {facts?.map((fact, i) => {
        const isImage = (fact.variant ?? 'image') === 'image'
        const span = fact.span ?? 'normal'
        const hasText = Boolean(fact.label || fact.description || fact.button?.label)

        return (
          <div
            key={i}
            className={`relative overflow-hidden flex flex-col items-center text-center p-6 ${
              spanClasses[span]
            } ${isImage ? 'bg-gray-200' : colorClasses[fact.color ?? 'white']} ${
              hasText ? 'justify-start pt-10' : 'justify-center'
            }`}
          >
            {isImage && fact.image && (
              <>
                <Media resource={fact.image} fill imgClassName="object-cover" />
                {hasText && <div className="absolute inset-0 bg-black/10" />}
              </>
            )}

            {hasText && (
              <div className={`relative z-10 flex flex-col items-center gap-3 ${isImage ? 'text-white' : ''}`}>
                {fact.label && (
                  <h3 className="text-sm font-semibold tracking-widest uppercase pb-2 border-b border-current/50 inline-block">
                    {fact.label}
                  </h3>
                )}
                {fact.description && (
                  <p className="text-sm max-w-[220px] leading-relaxed">{fact.description}</p>
                )}
                {fact.button?.label && fact.button?.url && (
                  <a
                    href={fact.button.url}
                    className="mt-3 inline-block text-xs font-semibold tracking-widest uppercase px-5 py-2 border border-current hover:bg-current/10 transition-colors"
                  >
                    {fact.button.label}
                  </a>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
