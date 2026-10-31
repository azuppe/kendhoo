export type MonthCell = { date: Date; inMonth: boolean; key: string }

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Weeks (Monday first) covering the month, as rows of 7 cells. */
export function monthGrid(year: number, month: number): MonthCell[][] {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - offset)
  const weeks: MonthCell[][] = []
  let cursor = new Date(start)
  do {
    const week: MonthCell[] = []
    for (let i = 0; i < 7; i++) {
      week.push({ date: new Date(cursor), inMonth: cursor.getMonth() === month, key: dayKey(cursor) })
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
    }
    weeks.push(week)
  } while (cursor.getMonth() === month || weeks.length < 4)
  return weeks
}

export function startOfWeek(d: Date): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  out.setDate(out.getDate() - ((out.getDay() + 6) % 7))
  return out
}

export function isThisWeek(d: Date, now: Date = new Date()): boolean {
  const s = startOfWeek(now)
  const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 7)
  return d >= s && d < e
}

/**
 * A local Date whose fields show the Maldives wall clock (UTC+5) for an instant,
 * so grouping by day matches what islanders see whatever the browser's time zone.
 */
export function toMaldivesWall(d: Date): Date {
  const s = new Date(d.getTime() + 5 * 3600 * 1000)
  return new Date(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes())
}
