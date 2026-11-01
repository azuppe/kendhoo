'use client'

import { Search as SearchIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useDebounce } from '@/utilities/useDebounce'

export type SearchFilters = { q: string; type: string; category: string; from: string; to: string }

type Props = {
  initial: SearchFilters
  categories: { id: string; title: string }[]
  locale: string
}

type Suggestion = { id: string; title: string; href: string }

const field =
  'h-12 w-full border-0 border-b border-border bg-transparent px-0 text-[15px] focus:border-foreground focus:outline-none'
const labelCls = 'eyebrow mb-1 block'

export const Search: React.FC<Props> = ({ initial, categories, locale }) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [f, setF] = useState<SearchFilters>(initial)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [focused, setFocused] = useState(false)
  const debounced = useDebounce(f, 300)
  const first = useRef(true)

  // keep the URL in step with the form so results are shareable
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const query: Record<string, string> = {}
    for (const [k, v] of Object.entries(debounced)) if (v) query[k] = v
    router.replace({ pathname, query }, { scroll: false })
  }, [debounced, pathname, router])

  // as-you-type suggestions
  useEffect(() => {
    const q = debounced.q.trim()
    if (q.length < 2) {
      setSuggestions([])
      return
    }
    const ctrl = new AbortController()
    const qs = new URLSearchParams({ limit: '5', depth: '0', locale })
    qs.set('where[title][like]', q)
    fetch(`/api/search?${qs.toString()}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : { docs: [] }))
      .then((data: { docs: { id: string; title?: string; slug?: string; doc: { relationTo: string } }[] }) =>
        setSuggestions(
          data.docs
            .filter((d) => d.title && d.slug)
            .map((d) => ({
              id: d.id,
              title: d.title as string,
              href: `/${d.doc.relationTo}/${d.slug}`,
            })),
        ),
      )
      .catch(() => {})
    return () => ctrl.abort()
  }, [debounced.q, locale])

  const set = (k: keyof SearchFilters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))
  const active = Object.values(f).some(Boolean)

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="space-y-10">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          {t('search')}
        </label>
        <SearchIcon className="pointer-events-none absolute start-0 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" strokeWidth={1.25} />
        <input
          id="search"
          type="search"
          value={f.q}
          onChange={set('q')}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          autoComplete="off"
          placeholder={t('search')}
          className="h-20 w-full border-0 border-b border-foreground bg-transparent ps-12 font-serif text-4xl placeholder:text-muted-foreground/60 focus:outline-none md:text-5xl"
        />
        {focused && suggestions.length > 0 && (
          <ul
            aria-label="Suggestions"
            className="absolute inset-x-0 top-full z-20 border border-t-0 border-border bg-background"
          >
            {suggestions.map((s) => (
              <li key={s.id}>
                <Link href={s.href as '/'} className="block px-5 py-3 text-[16px] hover:bg-card">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="f-type" className={labelCls}>
            Type
          </label>
          <select id="f-type" value={f.type} onChange={set('type')} className={field}>
            <option value="">Everything</option>
            <option value="posts">News</option>
            <option value="events">Events</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-cat" className={labelCls}>
            Category
          </label>
          <select id="f-cat" value={f.category} onChange={set('category')} className={field}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-from" className={labelCls}>
            From
          </label>
          <input id="f-from" type="date" value={f.from} onChange={set('from')} className={field} />
        </div>
        <div>
          <label htmlFor="f-to" className={labelCls}>
            To
          </label>
          <input id="f-to" type="date" value={f.to} min={f.from || undefined} onChange={set('to')} className={field} />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            disabled={!active}
            onClick={() => setF({ q: '', type: '', category: '', from: '', to: '' })}
            className="h-12 text-[12px] font-medium uppercase tracking-[0.18em] hover:opacity-70 disabled:opacity-30"
          >
            Clear filters
          </button>
        </div>
      </div>
    </form>
  )
}
