import React from 'react'

export type TripOverviewBlockProps = {
  title?: string | null
  description?: string | null
}

export const TripOverviewBlock: React.FC<TripOverviewBlockProps> = ({ title, description }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-start">
            {title}
          </h2>
        )}
        {description && (
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            {description
              .split(/\n+/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
