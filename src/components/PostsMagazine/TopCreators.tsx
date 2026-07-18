import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { SectionHeader } from './SectionHeader'

export const TopCreators: React.FC<{
  creators: { id: string; name: string; avatar?: MediaType }[]
}> = ({ creators }) => {
  if (!creators.length) return null

  return (
    <div>
      <SectionHeader title="Top Creator" />
      <div className="flex flex-wrap gap-x-10 gap-y-6">
        {creators.map((creator) => (
          <div key={creator.id} className="flex items-center gap-3">
            <span className="block h-12 w-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
              {creator.avatar && <Media resource={creator.avatar} imgClassName="object-cover h-12 w-12" />}
            </span>
            <span className="font-semibold text-sm text-gray-900">{creator.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
