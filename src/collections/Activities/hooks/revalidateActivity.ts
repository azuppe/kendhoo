import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Activity } from '../../../payload-types'

export const revalidateActivity: CollectionAfterChangeHook<Activity> = ({
  doc,
  previousDoc,
  req: { payload, i18n },
}) => {
  const locale = i18n.language
  if (doc._status === 'published') {
    const path = `/${locale}/things-to-do/${doc.slug}`

    payload.logger.info(`Revalidating activity at path: ${path}`)

    revalidatePath(path)
    revalidatePath(`/${locale}/things-to-do`)
  }

  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${locale}/things-to-do/${previousDoc.slug}`

    payload.logger.info(`Revalidating old activity at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
