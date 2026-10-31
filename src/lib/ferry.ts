export type Ferry = { time: string; route: string; days: string[] }

const OFFSET_MINUTES = 5 * 60 // Maldives is UTC+5 all year

/** Wall-clock parts in Maldives time for an instant. */
function maldivesParts(now: Date) {
  const shifted = new Date(now.getTime() + OFFSET_MINUTES * 60 * 1000)
  return {
    day: shifted.getUTCDay(),
    minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes(),
  }
}

export function parseTime(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim())
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

/** The next departure after `now`, looking up to a week ahead. */
export function nextFerry(
  ferries: Ferry[],
  now: Date = new Date(),
): { ferry: Ferry; daysAhead: number } | null {
  const { day, minutes } = maldivesParts(now)
  let best: { ferry: Ferry; daysAhead: number; at: number } | null = null
  for (const ferry of ferries) {
    const t = parseTime(ferry.time)
    if (t === null) continue
    for (let ahead = 0; ahead < 7; ahead++) {
      if (!ferry.days.includes(String((day + ahead) % 7))) continue
      if (ahead === 0 && t <= minutes) continue
      const at = ahead * 1440 + t
      if (!best || at < best.at) best = { ferry, daysAhead: ahead, at }
      break
    }
  }
  return best && { ferry: best.ferry, daysAhead: best.daysAhead }
}
