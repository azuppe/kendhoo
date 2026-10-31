import React from 'react'

import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'

export const QuoteBlockComponent: React.FC<QuoteBlockProps> = ({ quote, name, role }) => {
  if (!quote) {
    return null
  }

  return (
    <div className="mx-auto my-8 w-full max-w-3xl rounded border border-border p-8">
      <blockquote className="text-2xl leading-snug text-foreground">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground">{name}</p>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
      </footer>
    </div>
  )
}
