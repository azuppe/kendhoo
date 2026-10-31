import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CommentForm } from './CommentForm'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const Comments: React.FC<{ postId: string | number }> = async ({ postId }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: postId },
      approved: { equals: true },
    },
    sort: '-createdAt',
    depth: 0,
    limit: 100,
  })

  return (
    <div className="bg-background rounded-none p-6 mt-6">
      <h2 className="text-lg font-medium mb-6">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <div className="flex flex-col gap-6 mb-8">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">Be the first to leave a comment.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{c.authorName}</span>
              <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">{c.comment}</p>
          </div>
        ))}
      </div>

      <CommentForm postId={postId} />
    </div>
  )
}
