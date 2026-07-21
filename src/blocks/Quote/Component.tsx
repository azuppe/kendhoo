import React from 'react'

import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'

export const QuoteBlockComponent: React.FC<QuoteBlockProps> = ({ quote, name, role }) => {
  if (!quote) {
    return null
  }

  return (
    <div className="mx-auto my-8 w-full max-w-3xl rounded border border-gray-200 p-8">
      <blockquote className="text-2xl leading-snug text-gray-800">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-900">{name}</p>
        {role && <p className="text-sm text-gray-500">{role}</p>}
      </footer>
    </div>
  )
}
