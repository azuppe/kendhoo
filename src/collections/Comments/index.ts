import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateComment } from './hooks/revalidateComment'
import { rejectSpam } from './hooks/rejectSpam'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: anyone,
    delete: authenticated,
    read: ({ req: { user } }) => {
      if (user) return true

      return {
        approved: {
          equals: true,
        },
      }
    },
    update: authenticated,
  },
  admin: {
    defaultColumns: ['authorName', 'post', 'approved', 'createdAt'],
    useAsTitle: 'authorName',
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      maxLength: 2000,
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide this comment from the public without deleting it.',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Honeypot field — left blank by real visitors, hidden from the public form.',
      },
    },
  ],
  hooks: {
    beforeValidate: [rejectSpam],
    afterChange: [revalidateComment],
  },
}

export default Comments
