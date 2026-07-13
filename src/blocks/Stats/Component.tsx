import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type StatItem = {
  number: string
  label: string
  link?: any
}

export type StatsBlockProps = {
  title?: string | null
  description?: string | null
  image: any
  stats: StatItem[]
}

const StatCard: React.FC<{ stat: StatItem; className?: string }> = ({ stat, className }) => (
  <div className={`rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 flex flex-col ${className || ''}`}>
    <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">{stat.number}</p>
    <p className="text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
    {stat.link?.label && (
      <CMSLink
        className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium"
        appearance="default"
        {...stat.link}
      >
        <ArrowUpRight className="w-4 h-4" />
      </CMSLink>
    )}
  </div>
)

export const StatsBlock: React.FC<StatsBlockProps> = ({ title, description, image, stats }) => {
  const [first, second, third, ...rest] = stats || []

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr] lg:grid-rows-2 gap-6">
          <div className="lg:col-start-1 lg:row-start-1 flex flex-col justify-center">
            {title && (
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-6 max-w-md">
                {description}
              </p>
            )}
          </div>

          {first && <StatCard stat={first} className="lg:col-start-2 lg:row-start-1" />}
          {second && <StatCard stat={second} className="lg:col-start-3 lg:row-start-1" />}

          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2 rounded-2xl overflow-hidden relative min-h-64">
            {image && typeof image === 'object' && (
              <Media resource={image} fill imgClassName="object-cover" />
            )}
          </div>

          {third && <StatCard stat={third} className="lg:col-start-3 lg:row-start-2" />}
        </div>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rest.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
