import React from 'react'

type TimelineEvent = {
  year: string
  title: string
  description?: string | null
}

export type TimelineBlockProps = {
  title?: string | null
  events: TimelineEvent[]
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ title, events }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {title && (
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10 text-start">{title}</h2>
        )}
        <ol className="relative border-s border-gray-200 dark:border-gray-800 ms-3">
          {events?.map((event, i) => (
            <li key={i} className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 bg-blue-600 text-white text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-blue-600 mb-1">{event.year}</p>
              <h3 className="text-lg font-bold mb-1">{event.title}</h3>
              {event.description && (
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
