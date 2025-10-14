import { cn } from '@/utilities/ui'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card } from '@/components/Card'

export type Props = {
  posts: Post[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-4 lg:gap-y-6 lg:gap-x-6 xl:gap-x-6">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-1 w-full" key={index}>
                  <Card className="h-full w-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
