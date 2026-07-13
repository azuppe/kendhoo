import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    ...slugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description of this category',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name (e.g., MapPin, Camera, Waves, Fish, Fork)',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code for category (e.g., #FF6B6B)',
      },
    },
  ],
}

export default Categories
