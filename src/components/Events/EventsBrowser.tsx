'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { dayKey, isThisWeek, monthGrid, toMaldivesWall } from '@/lib/calendar'
import { buildIcs } from '@/lib/ics'
import { cn } from '@/utilities/ui'

export type BrowserEvent = {
  id: string
  slug: string
  title: string
  startDate: string | null
  endDate: string | null
  venue: string | null
  isFree: boolean
  description: string | null
  imageUrl: string | null
  imageAlt: string | null
}

type When = 'upcoming' | 'week' | 'past'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const tab = (on: boolean) =>
  cn(
    'min-h-12 border-b text-[12px] font-medium uppercase tracking-[0.18em] transition-colors',
    on ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
  )

export const EventsBrowser: React.FC<{ events: BrowserEvent[]; locale: string }> = ({
  events,
  locale,
}) => {
  const [view, setView] = useState<'list' | 'month'>('list')
  const [when, setWhen] = useState<When>('upcoming')
  const [freeOnly, setFreeOnly] = useState(false)
  const nowWall = useMemo(() => toMaldivesWall(new Date()), [])
  const [cursor, setCursor] = useState({ y: nowWall.getFullYear(), m: nowWall.getMonth() })

  const fmtLocale = locale === 'dv' ? 'dv-MV' : 'en-GB'
  const dated = useMemo(
    () =>
      events
        .filter((e) => e.startDate)
        .map((e) => ({ ...e, start: new Date(e.startDate as string), wall: toMaldivesWall(new Date(e.startDate as string)) }))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events],
  )
  const undated = events.filter((e) => !e.startDate)

  const today = new Date(nowWall.getFullYear(), nowWall.getMonth(), nowWall.getDate())
  const filtered = dated.filter((e) => {
    if (freeOnly && !e.isFree) return false
    if (when === 'week') return isThisWeek(e.wall, nowWall)
    if (when === 'past') return e.wall < today
    return e.wall >= today
  })
  if (when === 'past') filtered.reverse()

  function icsFor(list: typeof filtered) {
    return buildIcs(
      list.map((e) => ({
        uid: `${e.id}@kendhoo.online`,
        title: e.title,
        start: e.start,
        end: e.endDate ? new Date(e.endDate) : null,
        location: e.venue,
        description: e.description,
        url: `${window.location.origin}/${locale}/events/${e.slug}`,
      })),
    )
  }

  const dateFmt = new Intl.DateTimeFormat(fmtLocale, { weekday: 'short', day: 'numeric', month: 'long' })
  const timeFmt = new Intl.DateTimeFormat(fmtLocale, { hour: '2-digit', minute: '2-digit' })
  const monthLabel = new Intl.DateTimeFormat(fmtLocale, { month: 'long', year: 'numeric' }).format(
    new Date(cursor.y, cursor.m, 1),
  )

  const byDay = useMemo(() => {
    const map = new Map<string, typeof dated>()
    for (const e of dated) {
      if (freeOnly && !e.isFree) continue
      const k = dayKey(e.wall)
      map.set(k, [...(map.get(k) || []), e])
    }
    return map
  }, [dated, freeOnly])

  const shiftMonth = (delta: number) =>
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-10 gap-y-2 border-b border-border">
        <div role="group" aria-label="View" className="flex gap-8">
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={tab(view === 'list')}>
            List
          </button>
          <button type="button" aria-pressed={view === 'month'} onClick={() => setView('month')} className={tab(view === 'month')}>
            Month
          </button>
        </div>
        {view === 'list' && (
          <div role="group" aria-label="When" className="flex gap-8">
            {(['upcoming', 'week', 'past'] as const).map((w) => (
              <button key={w} type="button" aria-pressed={when === w} onClick={() => setWhen(w)} className={tab(when === w)}>
                {w === 'week' ? 'This week' : w === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>
        )}
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="h-4 w-4 accent-foreground"
          />
          Free only
        </label>
        {view === 'list' && filtered.length > 0 && (
          <button
            type="button"
            onClick={() => download('kendhoo-events.ics', icsFor(filtered))}
            className="ms-auto min-h-12 text-[12px] font-medium uppercase tracking-[0.18em] hover:opacity-70"
          >
            Add all to calendar
          </button>
        )}
      </div>

      {view === 'list' && (
        <>
          {filtered.length === 0 && (
            <p className="py-24 font-serif text-3xl text-muted-foreground">No events here yet.</p>
          )}
          <ol className="m-0 list-none p-0">
            {filtered.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center gap-x-12 gap-y-6 border-b border-border py-10"
              >
                <div className="w-36 shrink-0">
                  <span className="block font-serif text-6xl leading-none">{e.wall.getDate()}</span>
                  <span className="eyebrow-brass mt-2 block">
                    {new Intl.DateTimeFormat(fmtLocale, { month: 'long' }).format(e.wall)}
                  </span>
                </div>
                {e.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.imageUrl}
                    alt={e.imageAlt || ''}
                    className="aspect-[4/3] w-52 shrink-0 bg-card object-cover"
                    loading="lazy"
                  />
                )}
                <div className="min-w-[16rem] flex-1 space-y-3">
                  <h2 className="font-serif text-3xl leading-[1.1]">
                    <a href={`/${locale}/events/${e.slug}`} className="hover:opacity-70">
                      {e.title}
                    </a>
                  </h2>
                  <p className="text-[14px] text-muted-foreground">
                    {dateFmt.format(e.wall)} · {timeFmt.format(e.wall)}
                    {e.venue ? ` · ${e.venue}` : ''}
                    {e.isFree ? ' · Free' : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => download(`${e.slug}.ics`, icsFor([e]))}
                  className="h-12 border border-foreground px-7 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
                >
                  Add to calendar
                </button>
              </li>
            ))}
          </ol>
        </>
      )}

      {view === 'month' && (
        <div className="pt-10">
          <div className="flex items-center justify-center gap-8 pb-8">
            <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="flex h-11 w-11 items-center justify-center hover:opacity-70">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <h2 className="min-w-48 text-center font-serif text-4xl">{monthLabel}</h2>
            <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="flex h-11 w-11 items-center justify-center hover:opacity-70">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="grid min-w-[44rem] grid-cols-7 border-s border-t border-border">
              {WEEKDAYS.map((d) => (
                <div key={d} className="eyebrow border-e border-b border-border px-3 py-3">
                  {d}
                </div>
              ))}
              {monthGrid(cursor.y, cursor.m)
                .flat()
                .map((cell) => {
                  const list = byDay.get(cell.key) || []
                  const isToday = cell.key === dayKey(today)
                  return (
                    <div
                      key={cell.key}
                      className={cn(
                        'flex min-h-32 flex-col gap-2 border-e border-b border-border p-3',
                        !cell.inMonth && 'bg-card/50 text-muted-foreground/50',
                      )}
                    >
                      <span className={cn('font-serif text-2xl', isToday && 'text-brass underline underline-offset-4')}>
                        {cell.date.getDate()}
                      </span>
                      {list.map((e) => (
                        <a
                          key={e.id}
                          href={`/${locale}/events/${e.slug}`}
                          className="border-t border-brass pt-1.5 text-[12px] leading-snug text-brass hover:opacity-70"
                        >
                          {e.title}
                        </a>
                      ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}

      {undated.length > 0 && view === 'list' && (
        <section className="pt-20" aria-labelledby="more-events">
          <h2 id="more-events" className="mb-6 font-serif text-4xl">
            More to explore
          </h2>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {undated.map((e) => (
              <li key={e.id} className="border-t border-border py-5">
                <a href={`/${locale}/events/${e.slug}`} className="font-serif text-2xl hover:opacity-70">
                  {e.title}
                </a>
                {e.venue && <p className="text-[14px] text-muted-foreground">{e.venue}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
