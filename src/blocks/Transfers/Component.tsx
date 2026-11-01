import React from 'react'
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'

import { Media } from '@/components/Media'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type Departure = { time: string; days?: string | null; note?: string | null }

type Option = {
  type?: string | null
  name: string
  image?: any
  from?: string | null
  to?: string | null
  duration?: string | null
  price?: string | null
  departures?: Departure[] | null
  onRequest?: boolean | null
  notes?: string | null
  contactName?: string | null
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  bookingUrl?: string | null
}

export type TransfersBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  options?: Option[] | null
}

const TYPE_LABELS: Record<string, string> = {
  ferry: 'Public ferry',
  speedboat: 'Speedboat',
  seaplane: 'Seaplane',
  flight: 'Domestic flight',
  other: 'Transfer',
}

const contactBtn =
  'inline-flex h-10 items-center gap-2 border-2 border-foreground px-4 text-[12px] font-bold uppercase tracking-[0.04em] transition-colors hover:bg-foreground hover:text-background'

export const TransfersBlock: React.FC<TransfersBlockProps> = ({
  title,
  titleColor,
  description,
  options,
}) => {
  if (!options?.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          {title && (
            <h2 className={`text-4xl md:col-span-7 md:text-6xl ${getTitleColorClass(titleColor)}`}>
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground md:col-span-5 md:self-end">{description}</p>
          )}
        </div>

        <ul className="grid grid-cols-1 border-l-2 border-t-2 border-foreground lg:grid-cols-2">
          {options.map((o, i) => {
            const hasImage = o.image && typeof o.image === 'object'
            const wa = o.whatsapp?.replace(/\D/g, '')
            const deps = o.departures || []
            return (
              <li key={i} className="flex flex-col border-b-2 border-r-2 border-foreground">
                {hasImage && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-card">
                    <Media resource={o.image} fill imgClassName="object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-6 p-6">
                  <div>
                    <p className={o.type === 'speedboat' ? 'eyebrow-brass' : 'eyebrow'}>
                      {TYPE_LABELS[o.type || 'other'] || o.type}
                    </p>
                    <h3 className="mt-2 text-3xl md:text-4xl">{o.name}</h3>
                    {(o.from || o.to) && (
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-lg font-bold">
                        {o.from}
                        {o.from && o.to && <ArrowRight className="h-5 w-5" aria-label="to" />}
                        {o.to}
                      </p>
                    )}
                  </div>

                  {(o.duration || o.price) && (
                    <dl className="grid grid-cols-2 border-t-2 border-foreground">
                      {o.duration && (
                        <div className="pt-3">
                          <dt className="eyebrow">Duration</dt>
                          <dd className="font-bold tabular-nums">{o.duration}</dd>
                        </div>
                      )}
                      {o.price && (
                        <div className="pt-3">
                          <dt className="eyebrow">Fare</dt>
                          <dd className="font-bold tabular-nums">{o.price}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  {o.onRequest ? (
                    <p className="border-t-2 border-foreground pt-3 font-bold">
                      On request — contact the operator to arrange a time.
                    </p>
                  ) : deps.length > 0 ? (
                    <ul className="border-t-2 border-foreground">
                      {deps.map((d, j) => (
                        <li
                          key={j}
                          className="flex items-baseline gap-4 border-b border-foreground/30 py-2 last:border-b-0"
                        >
                          <span className="w-20 text-2xl font-black tabular-nums tracking-tight">
                            {d.time}
                          </span>
                          <span className="flex-1 text-sm">
                            {d.days}
                            {d.note && <span className="text-muted-foreground"> · {d.note}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {o.notes && <p className="text-sm text-muted-foreground">{o.notes}</p>}

                  {(o.phone || wa || o.email || o.bookingUrl) && (
                    <div className="mt-auto">
                      {o.contactName && <p className="eyebrow mb-3">{o.contactName}</p>}
                      <div className="flex flex-wrap gap-2">
                        {o.phone && (
                          <a href={`tel:${o.phone.replace(/[^\d+]/g, '')}`} className={contactBtn}>
                            <Phone className="h-4 w-4" />
                            {o.phone}
                          </a>
                        )}
                        {wa && (
                          <a
                            href={`https://wa.me/${wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={contactBtn}
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                          </a>
                        )}
                        {o.email && (
                          <a href={`mailto:${o.email}`} className={contactBtn}>
                            <Mail className="h-4 w-4" />
                            Email
                          </a>
                        )}
                        {o.bookingUrl && (
                          <a
                            href={o.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-luxe h-10 gap-2"
                          >
                            Book
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
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
