import React from 'react'
import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type Testimonial = {
  quote: string
  name: string
  role?: string | null
  photo?: any
}

export type TestimonialsBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  items: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ title, titleColor, items }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4  ">
        {title && (
          <h2 className={`  text-4xl md:text-5xl font-bold mb-10 text-start ${getTitleColorClass(titleColor)}`}>{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items?.map((item, i) => (
            <blockquote
              key={i}
              className="p-6 rounded-2xl bg-white shadow flex flex-col gap-4"
            >
              <p className="text-gray-700 italic">&ldquo;{item.quote}&rdquo;</p>
              <footer className="flex items-center gap-3 mt-auto">
                {item.photo && (
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Media resource={item.photo} imgClassName="w-10 h-10 object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  {item.role && <p className="text-xs text-gray-500">{item.role}</p>}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
