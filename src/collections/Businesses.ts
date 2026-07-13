import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

const Businesses: CollectionConfig = {
  slug: 'businesses',
  labels: {
    singular: 'Business',
    plural: 'Businesses',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'island'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    ...slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'shop',
      options: [
        { label: 'Restaurant / Cafe', value: 'restaurant' },
        { label: 'Shop', value: 'shop' },
        { label: 'Accommodation', value: 'accommodation' },
        { label: 'Service', value: 'service' },
      ],
    },
    {
      name: 'island',
      type: 'relationship',
      relationTo: 'islands' as any,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
    },
    {
      name: 'hours',
      type: 'text',
      localized: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      admin: { step: 0.1 },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in the Featured Business spotlight',
      },
    },
  ],
}

export default Businesses
