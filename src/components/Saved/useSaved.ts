'use client'

import { useCallback, useSyncExternalStore } from 'react'

import { SAVED_KEY, parseSaved, toggleSaved } from '@/lib/saved'

const EMPTY: string[] = []
const listeners = new Set<() => void>()
let cache: { raw: string | null; list: string[] } = { raw: null, list: EMPTY }

function read(): string[] {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(SAVED_KEY)
  } catch {
    return cache.list
  }
  if (raw !== cache.raw) cache = { raw, list: parseSaved(raw) }
  return cache.list
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

/** Saved story ids, kept in this browser's localStorage and shared across tabs. */
export function useSaved() {
  const list = useSyncExternalStore(subscribe, read, () => EMPTY)

  const toggle = useCallback((id: string) => {
    const next = toggleSaved(read(), id)
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next))
    } catch {
      // storage blocked: nothing to persist
    }
    cache = { raw: JSON.stringify(next), list: next }
    listeners.forEach((l) => l())
  }, [])

  return { saved: list, isSaved: (id: string) => list.includes(id), toggle }
}
