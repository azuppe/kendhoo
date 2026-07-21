import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type IncludedItem = {
  label: string
}

export type WhatsIncludedBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  items: IncludedItem[]
}

export const WhatsIncludedBlock: React.FC<WhatsIncludedBlockProps> = ({ title, titleColor, items }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {title && (
          <h2 className={`  text-4xl md:text-5xl font-bold mb-6 text-start ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 rounded-2xl bg-gray-50 border border-gray-100 p-6">
          {items?.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
