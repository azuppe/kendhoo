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
    <section className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        {title && (
          <h2 className={`mb-16 text-center text-4xl md:text-6xl ${getTitleColorClass(titleColor)}`}>
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-3">
          {items?.map((item, i) => (
            <figure key={i} className="flex flex-col gap-8 border-t border-foreground pt-8">
              <blockquote className="font-serif text-[26px] italic leading-[1.35]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                {item.photo && (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-background">
                    <Media resource={item.photo} imgClassName="h-12 w-12 object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.18em]">{item.name}</p>
                  {item.role && <p className="mt-1 text-[14px] text-muted-foreground">{item.role}</p>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
