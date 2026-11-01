import React from 'react'

import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type Contact = { name: string; detail?: string | null; phone: string; emergency?: boolean | null }

export type UsefulNumbersBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  contacts?: Contact[] | null
}

export const UsefulNumbersBlock: React.FC<UsefulNumbersBlockProps> = ({
  title,
  titleColor,
  contacts,
}) => {
  if (!contacts?.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`mb-8 text-4xl md:text-6xl ${getTitleColorClass(titleColor)}`}>{title}</h2>
        )}
        <ul className="grid grid-cols-1 border-l border-t border-foreground sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => (
            <li key={i} className="border-b border-r border-foreground">
              <a
                href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}
                className={`flex h-full flex-col justify-between gap-8 p-6 transition-colors ${
                  c.emergency
                    ? 'bg-[hsl(var(--brass))] text-white'
                    : 'hover:bg-foreground hover:text-background'
                }`}
              >
                <span>
                  <span className="block text-xl font-medium">{c.name}</span>
                  {c.detail && <span className="mt-1 block text-sm opacity-70">{c.detail}</span>}
                </span>
                <span className="text-4xl font-serif font-normal tabular-nums tracking-tight">{c.phone}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
