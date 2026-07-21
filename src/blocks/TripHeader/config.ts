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
    
  ],
}

export default TripHeader
