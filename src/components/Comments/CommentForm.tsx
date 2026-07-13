'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const CommentForm: React.FC<{ postId: string | number }> = ({ postId }) => {
  const [authorName, setAuthorName] = useState('')
  const [comment, setComment] = useState('')
  const [website, setWebsite] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const router = useRouter()

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const submit = async () => {
        setError(undefined)
        setIsLoading(true)

        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments`, {
            body: JSON.stringify({
              post: postId,
              authorName,
              comment,
              website,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            setIsLoading(false)
            setError(res.errors?.[0]?.message || 'Something went wrong. Please try again.')
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          setAuthorName('')
          setComment('')
          router.refresh()
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError('Something went wrong. Please try again.')
        }
      }

      void submit()
    },
    [authorName, comment, website, postId, router],
  )

  if (hasSubmitted) {
    return (
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
        Thanks! Your comment has been posted.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="authorName" className="block text-sm font-medium mb-1">
          Name
        </label>
        <Input
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={80}
          required
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-1">
          Comment
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={2000}
          required
          rows={4}
          placeholder="Share your thoughts..."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={isLoading} className="self-start">
        {isLoading ? 'Posting...' : 'Post comment'}
      </Button>
    </form>
  )
}
