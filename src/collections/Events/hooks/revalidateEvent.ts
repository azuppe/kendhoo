import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Event } from '../../../payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, i18n },
}) => {
  const locale = i18n.language
  if (doc._status === 'published') {
    const path = `/${locale}/events/${doc.slug}`

    payload.logger.info(`Revalidating event at path: ${path}`)

    revalidatePath(path)
  }

  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${locale}/events/${previousDoc.slug}`

    payload.logger.info(`Revalidating old event at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
