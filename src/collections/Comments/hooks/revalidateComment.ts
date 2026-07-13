import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Comment } from '../../../payload-types'

export const revalidateComment: CollectionAfterChangeHook<Comment> = async ({
  doc,
  req: { payload, i18n },
}) => {
  const postId = typeof doc.post === 'object' ? doc.post?.id : doc.post

  if (!postId) return doc

  const post = await payload.findByID({
    collection: 'posts',
    id: postId,
    depth: 0,
  })

  if (post?.slug) {
    const locale = i18n.language
    const path = `/${locale}/posts/${post.slug}`

    payload.logger.info(`Revalidating post at path: ${path} after comment change`)

    revalidatePath(path)
  }

  return doc
}
