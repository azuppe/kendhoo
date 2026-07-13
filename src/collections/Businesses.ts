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
      name: 'typeLabel',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Specific business type shown on the card, e.g. "Co-Working", "Hotel", "Shopping Mall", "Cinema", "Spa Beauty Parlour", "Cafe". Falls back to the category above if left blank.',
      },
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
      name: 'reviewCount',
      type: 'number',
      min: 0,
      admin: { description: 'Number of reviews behind the rating, e.g. 250' },
    },
    {
      name: 'openStatus',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
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
