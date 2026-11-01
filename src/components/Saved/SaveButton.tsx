'use client'

import { Bookmark } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'
import { useSaved } from './useSaved'

export const SaveButton: React.FC<{ id: string; className?: string; label?: boolean }> = ({
  id,
  className,
  label = false,
}) => {
  const { isSaved, toggle } = useSaved()
  const on = isSaved(id)

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Remove from saved stories' : 'Save story'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(id)
      }}
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 text-foreground transition-opacity hover:opacity-70',
        label ? 'px-1 text-[12px] font-medium uppercase tracking-[0.18em]' : 'w-11',
        className,
      )}
    >
      <Bookmark className="h-5 w-5" strokeWidth={1.5} fill={on ? 'currentColor' : 'none'} />
      {label && <span>{on ? 'Saved' : 'Save'}</span>}
    </button>
  )
}
