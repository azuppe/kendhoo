import React from 'react'
import { TypedLocale } from 'payload'

import { nextFerry, type Ferry } from '@/lib/ferry'
import { describeWeather } from '@/lib/weather'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { IslandInfo } from '@/payload-types'

async function getWeather(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Indian%2FMaldives`,
      { next: { revalidate: 1800 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const temp = data?.current?.temperature_2m
    const code = data?.current?.weather_code
    if (typeof temp !== 'number' || typeof code !== 'number') return null
    return `${Math.round(temp)}°C, ${describeWeather(code)}`
  } catch {
    return null
  }
}

async function getPrayer(lat: number, lon: number, method: number) {
  try {
    const now = new Date(Date.now() + 5 * 3600 * 1000) // Maldives date
    const dd = String(now.getUTCDate()).padStart(2, '0')
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${dd}-${mm}-${now.getUTCFullYear()}?latitude=${lat}&longitude=${lon}&method=${method}&timezonestring=Indian/Maldives`,
      { next: { revalidate: 21600 } },
    )
    if (!res.ok) return null
    const t = (await res.json())?.data?.timings
    if (!t?.Fajr) return null
    return `Fajr ${t.Fajr} · Maghrib ${t.Maghrib}`
  } catch {
    return null
  }
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Slim "Today in Kendhoo" line: weather, next ferry, prayer times. Hides itself when empty. */
export async function TodayStrip({ locale }: { locale: TypedLocale }) {
  const info = (await getCachedGlobal('island-info', 0, locale)()) as IslandInfo
  const lat = info?.latitude ?? 5.3
  const lon = info?.longitude ?? 73.0

  const [weather, prayer] = await Promise.all([
    info?.showWeather !== false ? getWeather(lat, lon) : null,
    info?.showPrayer ? getPrayer(lat, lon, info.prayerMethod ?? 1) : null,
  ])

  let ferryText: string | null = null
  if (info?.showFerry && info.ferries?.length) {
    const ferries: Ferry[] = info.ferries.map((f) => ({
      time: f.time,
      route: f.route,
      days: (f.days as string[] | null | undefined) ?? [],
    }))
    const next = nextFerry(ferries)
    if (next) {
      const when = next.daysAhead === 0 ? 'today' : DAYS[(new Date().getDay() + next.daysAhead) % 7]
      ferryText = `${next.ferry.route} ${next.ferry.time}, ${when}`
    }
  }

  const items = [
    weather && { label: 'Weather', value: weather },
    ferryText && { label: 'Next ferry', value: ferryText },
    prayer && { label: 'Prayer', value: prayer },
  ].filter(Boolean) as { label: string; value: string }[]

  if (!items.length) return null

  return (
    <aside
      aria-label="Today in Kendhoo"
      className="flex flex-wrap items-center gap-x-10 gap-y-2 border-y border-border py-4"
    >
      <span className="eyebrow-brass">Today in Kendhoo</span>
      {items.map((item) => (
        <span key={item.label} className="text-[14px]">
          <span className="eyebrow me-3">{item.label}</span>
          {item.value}
        </span>
      ))}
    </aside>
  )
}
