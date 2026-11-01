import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type Notice = {
  title: string
  body?: string | null
  category?: string | null
  date?: string | null
  expires?: string | null
  pinned?: boolean | null
  linkLabel?: string | null
  linkUrl?: string | null
}

export type NoticeBoardBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  notices?: Notice[] | null
  locale?: string
}

const LABELS: Record<string, string> = {
  general: 'General',
  urgent: 'Urgent',
  council: 'Council',
  utilities: 'Utilities',
  health: 'Health',
  transport: 'Transport',
  community: 'Community',
}

export const NoticeBoardBlock: React.FC<NoticeBoardBlockProps> = ({
  title,
  titleColor,
  notices,
  locale = 'en',
}) => {
  const now = Date.now()
  const visible = (notices || [])
    .filter((n) => !n.expires || new Date(n.expires).getTime() >= now)
    .sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    })

  if (!visible.length) return null

  const fmt = (d: string) =>
    new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(
      new Date(d),
    )

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`mb-8 text-4xl md:text-6xl ${getTitleColorClass(titleColor)}`}>{title}</h2>
        )}
        <ul className="border-t border-foreground">
          {visible.map((n, i) => {
            const urgent = n.category === 'urgent'
            return (
              <li
                key={i}
                className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-foreground py-6 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className={urgent ? 'eyebrow-brass' : 'eyebrow'}>
                    {LABELS[n.category || 'general'] || n.category}
                    {n.pinned ? ' · Pinned' : ''}
                  </p>
                  {n.date && (
                    <p className="mt-1 text-sm tabular-nums text-muted-foreground">{fmt(n.date)}</p>
                  )}
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-2xl md:text-3xl">{n.title}</h3>
                  {n.body && (
                    <p className="mt-2 max-w-2xl whitespace-pre-line text-muted-foreground">
                      {n.body}
                    </p>
                  )}
                  {n.linkUrl && (
                    <a
                      href={n.linkUrl}
                      className="link-luxe mt-4 inline-flex items-center gap-1.5"
                    >
                      {n.linkLabel || 'Read more'}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
