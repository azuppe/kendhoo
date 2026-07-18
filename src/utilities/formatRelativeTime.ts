export const formatRelativeTime = (timestamp?: string | null): string => {
  if (!timestamp) return ''

  const then = new Date(timestamp).getTime()
  const now = Date.now()
  const diffSeconds = Math.max(0, Math.floor((now - then) / 1000))

  const units: [string, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]

  for (const [label, secondsInUnit] of units) {
    const value = Math.floor(diffSeconds / secondsInUnit)
    if (value >= 1) {
      return `${value} ${label}${value > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}
