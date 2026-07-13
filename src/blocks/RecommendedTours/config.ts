import type { Block } from 'payload'

export const RecommendedTours: Block = {
  slug: 'recommendedTours',
  interfaceName: 'RecommendedToursBlock',
  labels: {
    singular: 'Recommended Tours Block',
    plural: 'Recommended Tours Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Recommended for you',
    },
    {
      name: 'tours',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "ON SALE"' },
        },
        {
          name: 'ageRange',
          type: 'text',
          admin: { description: 'e.g. "18-30s"' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'durationLabel',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "20 days"' },
        },
        {
          name: 'route',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Nairobi to Victoria Falls"' },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'originalPrice',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'departsOn',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Departs on Oct 05, 2026"' },
        },
        {
          name: 'tags',
          type: 'array',
          maxRows: 3,
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'buttonLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Book Adventure',
        },
        {
          name: 'link',
          type: 'text',
          admin: { description: 'URL this tour card links to' },
        },
      ],
    },
  ],
}

export default RecommendedTours
