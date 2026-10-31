'use client'

import { Bookmark } from 'lucide-react'
import React from 'react'
import { Link } from '@/i18n/routing'

import { useSaved } from './useSaved'

/** Header shortcut to the saved list, with a count when there is one. */
export const SavedLink: React.FC = () => {
  const { saved } = useSaved()

  return (
    <Link
      href="/saved"
      className="relative flex h-11 w-11 items-center justify-center hover:opacity-70"
    >
      <span className="sr-only">Saved stories{saved.length ? ` (${saved.length})` : ''}</span>
      <Bookmark className="h-5 w-5" strokeWidth={1.5} />
      {saved.length > 0 && (
        <span
          aria-hidden
          className="absolute end-1 top-1.5 flex h-4 min-w-4 items-center justify-center bg-brass px-1 text-[10px] font-medium leading-none text-background"
        >
          {saved.length}
        </span>
      )}
    </Link>
  )
}
