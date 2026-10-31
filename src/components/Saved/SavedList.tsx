'use client'

import React, { useEffect, useState } from 'react'

import type { Post } from '@/payload-types'

import { PostCard } from '@/components/PostsMagazine/PostCard'
import { Link } from '@/i18n/routing'
import { useSaved } from './useSaved'

export const SavedList: React.FC<{ locale: string }> = ({ locale }) => {
  const { saved } = useSaved()
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [failed, setFailed] = useState(false)
  const key = saved.join(',')

  useEffect(() => {
    if (!key) {
      setPosts([])
      return
    }
    const ctrl = new AbortController()
    const qs = new URLSearchParams({ depth: '1', limit: '100', locale })
    qs.set('where[id][in]', key)
    fetch(`/api/posts?${qs.toString()}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { docs: Post[] }) => {
        // keep the order the reader saved them in
        const order = new Map(key.split(',').map((id, i) => [id, i]))
        setPosts([...data.docs].sort((a, b) => (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0)))
        setFailed(false)
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setFailed(true)
      })
    return () => ctrl.abort()
  }, [key, locale])

  if (failed) {
    return <p className="text-muted-foreground">Could not load your saved stories. Please try again.</p>
  }
  if (posts === null) {
    return <p className="eyebrow">Loading</p>
  }
  if (posts.length === 0) {
    return (
      <div className="max-w-md space-y-6">
        <p className="font-serif text-3xl">Nothing saved yet.</p>
        <p className="text-muted-foreground">
          Tap the bookmark on any story to keep it here for later.
        </p>
        <Link href="/posts" className="link-luxe inline-block">
          Browse the news
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  )
}
