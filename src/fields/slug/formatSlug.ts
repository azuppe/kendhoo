import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ originalDoc, value, siblingData }) => {
    if (value) return formatSlug(value)
    if (!originalDoc?.slug && siblingData?.[fallback]) {
      return formatSlug(siblingData[fallback])
    }
    return originalDoc?.slug
  }
