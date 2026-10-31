'use client'

import React, { useEffect, useState } from 'react'

/** Thin bar under the header showing how far through the article the reader is. */
export const ReadingProgress: React.FC<{ targetId: string }> = ({ targetId }) => {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setPct(total > 0 ? (done / total) * 100 : 100)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetId])

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="fixed inset-x-0 top-20 z-40 h-px bg-transparent"
    >
      <div className="h-full bg-foreground transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  )
}
