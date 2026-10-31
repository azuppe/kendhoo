import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildIcs, icsEscape } from '../src/lib/ics.ts'
import { isThisWeek, monthGrid } from '../src/lib/calendar.ts'
import { nextFerry } from '../src/lib/ferry.ts'
import { parseSaved, toggleSaved } from '../src/lib/saved.ts'

test('ics: escapes and builds a valid event', () => {
  assert.equal(icsEscape('a,b;c\nd'), 'a\\,b\;c\\nd')
  const out = buildIcs(
    [{ uid: 'x@k', title: 'Boat race, harbour', start: new Date('2026-11-01T09:00:00Z') }],
    new Date('2026-10-31T00:00:00Z'),
  )
  assert.match(out, /BEGIN:VCALENDAR\r\n/)
  assert.match(out, /DTSTART:20261101T090000Z/)
  assert.match(out, /DTEND:20261101T100000Z/) // defaults to one hour
  assert.match(out, /SUMMARY:Boat race\\, harbour/)
  assert.ok(out.endsWith('END:VCALENDAR\r\n'))
})

test('ics: folds long lines', () => {
  const out = buildIcs([{ uid: 'y', title: 'x'.repeat(200), start: new Date(0) }])
  for (const line of out.split('\r\n')) assert.ok(line.length <= 75)
})

test('calendar: month grid starts on Monday and covers the month', () => {
  const weeks = monthGrid(2026, 10) // November 2026
  assert.equal(weeks[0][0].date.getDay(), 1)
  const inMonth = weeks.flat().filter((c) => c.inMonth)
  assert.equal(inMonth.length, 30)
  assert.ok(weeks.every((w) => w.length === 7))
})

test('calendar: isThisWeek', () => {
  const now = new Date(2026, 10, 4) // Wed
  assert.ok(isThisWeek(new Date(2026, 10, 2), now))
  assert.ok(isThisWeek(new Date(2026, 10, 8), now))
  assert.ok(!isThisWeek(new Date(2026, 10, 9), now))
})

test('ferry: picks the next departure in Maldives time', () => {
  const ferries = [
    { time: '07:30', route: 'Kendhoo to Male', days: ['0', '1', '2', '3', '4', '5', '6'] },
    { time: '15:00', route: 'Kendhoo to Male', days: ['1'] },
  ]
  // 02:00 UTC = 07:00 Maldives, so 07:30 today is next
  const a = nextFerry(ferries, new Date('2026-11-01T02:00:00Z'))
  assert.equal(a?.ferry.time, '07:30')
  assert.equal(a?.daysAhead, 0)
  // 03:00 UTC = 08:00 Maldives (Sunday): 07:30 has gone, so tomorrow
  const b = nextFerry(ferries, new Date('2026-11-01T03:00:00Z'))
  assert.equal(b?.ferry.time, '07:30')
  assert.equal(b?.daysAhead, 1)
  assert.equal(nextFerry([], new Date()), null)
  assert.equal(nextFerry([{ time: 'bad', route: 'x', days: ['0'] }], new Date()), null)
})

test('saved: parse and toggle', () => {
  assert.deepEqual(parseSaved(null), [])
  assert.deepEqual(parseSaved('not json'), [])
  assert.deepEqual(parseSaved('["a",1,"b"]'), ['a', 'b'])
  assert.deepEqual(toggleSaved(['a'], 'b'), ['b', 'a'])
  assert.deepEqual(toggleSaved(['a', 'b'], 'a'), ['b'])
})

test('calendar: toMaldivesWall shifts to UTC+5 wall clock', async () => {
  const { toMaldivesWall } = await import('../src/lib/calendar.ts')
  const w = toMaldivesWall(new Date('2026-11-01T20:30:00Z')) // 01:30 on 2 Nov in Maldives
  assert.equal(w.getDate(), 2)
  assert.equal(w.getHours(), 1)
  assert.equal(w.getMinutes(), 30)
})
