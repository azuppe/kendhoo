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
    <section className="flex flex-col sm:flex-row w-full h-[420px] md:h-[480px] overflow-hidden">
      {destinations?.map((dest, i) => {
        const content = (
          <>
            {dest.image && typeof dest.image === 'object' && (
              <Media
                fill
                resource={dest.image}
                imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
              <h3 className="text-2xl font-bold">{dest.title}</h3>
              {dest.subtitle && <p className="text-sm text-white/80 mt-1">{dest.subtitle}</p>}
            </div>
          </>
        )

        const className = 'relative flex-1 h-full overflow-hidden group'

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
