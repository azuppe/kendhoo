import React from 'react'

import { Media } from '@/components/Media'

type Destination = {
  image: any
  title: string
  subtitle?: string | null
  link?: string | null
}

export type DestinationsBlockProps = {
  destinations: Destination[]
}

export const DestinationsBlock: React.FC<DestinationsBlockProps> = ({ destinations }) => {
  return (
    <section className="flex h-auto w-full flex-col overflow-hidden sm:h-[520px] sm:flex-row md:h-[620px]">
      {destinations?.map((dest, i) => {
        const content = (
          <>
            {dest.image && typeof dest.image === 'object' && (
              <Media
                fill
                resource={dest.image}
                alt={dest.title}
                imgClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white">
              <h3 className="font-serif text-3xl">{dest.title}</h3>
              {dest.subtitle && (
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.06em] text-white/85">
                  {dest.subtitle}
                </p>
              )}
            </div>
          </>
        )

        const className = 'group relative h-80 flex-1 overflow-hidden bg-card sm:h-full'

        return dest.link ? (
          <a key={i} href={dest.link} className={className}>
            {content}
          </a>
        ) : (
          <div key={i} className={className}>
            {content}
          </div>
        )
      })}
    </section>
  )
}
