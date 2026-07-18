import React from 'react'

import type { Source } from '@/payload-types'

import { Media } from '@/components/Media'

export const StoryAvatars: React.FC<{ sources: Source[] }> = ({ sources }) => {
  if (!sources.length) return null

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Buletin Story</h2>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {sources.map((source) => (
          <div key={source.id} className="flex flex-col items-center gap-2 shrink-0 w-16">
            <span className="block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-900 p-0.5">
              <span className="block h-full w-full rounded-full overflow-hidden bg-gray-100">
                {source.logo && typeof source.logo === 'object' && (
                  <Media resource={source.logo} imgClassName="object-cover h-full w-full" />
                )}
              </span>
            </span>
            <span className="text-xs text-gray-600 truncate w-full text-center">{source.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
