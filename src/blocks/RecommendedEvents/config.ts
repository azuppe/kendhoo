import type { Block } from 'payload'

export const RecommendedEvents: Block = {
  slug: 'recommendedEvents',
  interfaceName: 'RecommendedEventsBlock',
  labels: {
    singular: 'Recommended Events Block',
    plural: 'Recommended Events Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Recommended for you',
    },
    {
      name: 'events',
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

      ],
    },
  ],
}

export default RecommendedEvents
