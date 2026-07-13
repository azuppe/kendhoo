import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

const Islands: CollectionConfig = {
  slug: 'islands',
  labels: {
    singular: 'Island',
    plural: 'Islands',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Island or atoll name',
      },
    },
    ...slugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief description of the island',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image of the island',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          admin: {
            step: 0.0001,
          },
        },
        {
          name: 'longitude',
          type: 'number',
          admin: {
            step: 0.0001,
          },
        },
        {
          name: 'atoll',
          type: 'text',
          localized: true,
          admin: {
            description: 'Atoll name (e.g., Malé City, Thiladhummati, Ari)',
          },
        },
      ],
    },
    {
      name: 'attractions',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
      admin: {
        description: 'Main attractions and activities on this island',
      },
    },
    {
      name: 'bestTimeToVisit',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Best season and weather information',
      },
    },
  ],
}

export default Islands
