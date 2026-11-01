import React from 'react'

import type { Source } from '@/payload-types'

import { Media } from '@/components/Media'

export const StoryAvatars: React.FC<{ sources: Source[] }> = ({ sources }) => {
  if (!sources.length) return null

  return (
    <div>
      <h2 className="eyebrow mb-6">Sources</h2>
      <div className="flex gap-8 overflow-x-auto pb-2">
        {sources.map((source) => (
          <div key={source.id} className="flex w-16 shrink-0 flex-col items-center gap-3">
            <span className="block h-16 w-16 overflow-hidden rounded-full border border-border bg-card">
              {source.logo && typeof source.logo === 'object' && (
                <Media resource={source.logo} imgClassName="object-cover h-full w-full" />
              )}
            </span>
            <span className="w-full truncate text-center text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              {source.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
