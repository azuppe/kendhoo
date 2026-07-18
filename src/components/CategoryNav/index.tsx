import Link from 'next/link'

import type { Category } from '@/payload-types'

import { cn } from '@/utilities/ui'

type Props = {
  categories: Category[]
  activeSlug?: string
  basePath?: string
}

export const CategoryNav: React.FC<Props> = ({ categories, activeSlug, basePath = '/posts' }) => {
  return (
    <nav className="border-b border-gray-200">
      <div className="container">
        <div className="flex items-center gap-6 lg:gap-8 overflow-x-auto">
          <Link
            href={basePath}
            className={cn(
              'whitespace-nowrap py-4 text-sm font-medium border-b-2 -mb-px transition-colors',
              !activeSlug
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-800',
            )}
          >
            All
          </Link>

          {categories.map((category) => {
            if (!category.slug) return null
            const isActive = activeSlug === category.slug

            return (
              <Link
                key={category.id}
                href={`${basePath}?category=${category.slug}`}
                className={cn(
                  'whitespace-nowrap py-4 text-sm font-medium border-b-2 -mb-px transition-colors',
                  isActive
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-800',
                )}
              >
                {category.title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
