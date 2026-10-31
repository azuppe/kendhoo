import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

/** Newsletter signups. Created only through the /next/subscribe route. */
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'locale', 'createdAt'],
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'locale', type: 'text' },
  ],
  timestamps: true,
}
