import type { Block } from 'payload'

export const TripHeader: Block = {
  slug: 'tripHeader',
  interfaceName: 'TripHeaderBlock',
  labels: {
    singular: 'Trip Header Block',
    plural: 'Trip Header Blocks',
  },
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Up to 4 photos for the top gallery collage (1 large left, 1 large center, 2 stacked right).',
      },
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        description: 'e.g. "Classic", "Far East AU5"',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'e.g. "Japan Express: Osaka to Tokyo"',
      },
    },
    {
      name: 'rating',
      type: 'number',
      admin: {
        description: 'e.g. 5',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      admin: {
        description: 'e.g. 296',
      },
    },
    {
      name: 'meta',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Trip meta row, e.g. Duration / Group Size / Pacing / Accommodation.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'duration',
          options: [
            { label: 'Duration', value: 'duration' },
            { label: 'Group Size', value: 'groupSize' },
            { label: 'Pacing', value: 'pacing' },
            { label: 'Accommodation', value: 'accommodation' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "9 Days"' },
        },
        {
          name: 'sublabel',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Max 16, Aug 13"' },
        },
      ],
    },
    {
      name: 'priceCard',
      type: 'group',
      admin: {
        description: 'Sticky price / booking card shown on the right.',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          defaultValue: 'TOP',
          admin: { description: 'e.g. "TOP"' },
        },
        {
          name: 'durationLabel',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "9 days"' },
        },
        {
          name: 'route',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Osaka to Tokyo"' },
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
          name: 'validOn',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Jul 24, 2026"' },
        },
        {
          name: 'tripCode',
          type: 'text',
          admin: { description: 'e.g. "AJJ5"' },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Book Now',
        },
        {
          name: 'buttonUrl',
          type: 'text',
        },
        {
          name: 'includes',
          type: 'array',
          maxRows: 3,
          admin: {
            description: 'Icon row under the button, e.g. Flight / Hotels / Tours.',
          },
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'flight',
              options: [
                { label: 'Flight', value: 'flight' },
                { label: 'Hotels', value: 'hotels' },
                { label: 'Tours', value: 'tours' },
              ],
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
            },
            {
              name: 'sublabel',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}

export default TripHeader
