import type { Category, Media as MediaType, Post, Source, User } from '@/payload-types'

export const getPostImage = (post: Post): MediaType | undefined => {
  const image = post.meta?.image
  return image && typeof image === 'object' ? image : undefined
}

export const getPostCategory = (post: Post): Category | undefined => {
  const category = post.categories?.find((c) => typeof c === 'object')
  return typeof category === 'object' ? category : undefined
}

export const getPostSource = (post: Post): Source | undefined => {
  return post.source && typeof post.source === 'object' ? post.source : undefined
}

export const formatCompactViews = (post: Post): string => {
  if (typeof post.viewCount === 'number') {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(post.viewCount)
  }
  // Stable placeholder derived from the post id so it doesn't shift between renders.
  const seed = String(post.id)
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const placeholder = 800 + (seed % 25) * 137
  return Intl.NumberFormat('en', { notation: 'compact' }).format(placeholder)
}

export const formatReadTime = (post: Post): number => {
  const seed = String(post.id)
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return 3 + (seed % 10)
}

export const topAuthorsFromPosts = (
  posts: Post[],
  max: number,
): { id: string; name: string; avatar?: MediaType }[] => {
  const tally = new Map<string, { name: string; avatar?: MediaType; count: number }>()

  for (const post of posts) {
    for (const author of post.populatedAuthors || []) {
      if (!author?.id || !author.name) continue
      const existing = tally.get(author.id)
      const avatar = author.avatar && typeof author.avatar === 'object' ? author.avatar : undefined
      if (existing) {
        existing.count += 1
        if (!existing.avatar && avatar) existing.avatar = avatar
      } else {
        tally.set(author.id, { name: author.name, avatar, count: 1 })
      }
    }
  }

  return Array.from(tally.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, max)
    .map(([id, value]) => ({ id, name: value.name, avatar: value.avatar }))
}
