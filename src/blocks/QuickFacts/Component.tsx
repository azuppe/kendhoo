import React from 'react'
import * as Icons from 'lucide-react'
import { MapPin } from 'lucide-react'
import { QuickFactsMosaic } from './Mosaic'

type QuickFact = {
  icon?: string | null
  label?: string | null
  value?: string | null
  description?: string | null
  variant?: 'image' | 'color' | null
  image?: any
  color?: 'blue' | 'white' | null
  span?: 'normal' | 'wide' | 'tall' | null
  button?: { label?: string | null; url?: string | null } | null
}

export type QuickFactsBlockProps = {
  title?: string | null
  layout?: 'stats' | 'mosaic' | null
  facts: QuickFact[]
}

export const QuickFactsBlock: React.FC<QuickFactsBlockProps> = ({ title, layout = 'stats', facts }) => {
  if (layout === 'mosaic') {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>}
          <QuickFactsMosaic facts={facts} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center rtl:text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {facts?.map((fact, i) => {
            const IconComp =
              (fact.icon && (Icons as unknown as Record<string, React.ElementType>)[fact.icon]) ||
              MapPin
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                <IconComp className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold">{fact.value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{fact.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
