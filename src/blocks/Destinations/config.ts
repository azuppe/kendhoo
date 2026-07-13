import type { Block } from 'payload'

export const Destinations: Block = {
  slug: 'destinations',
  interfaceName: 'DestinationsBlock',
  labels: {
    singular: 'Destinations Block',
    plural: 'Destinations Blocks',
  },
  fields: [
    {
      name: 'destinations',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional URL this destination links to',
          },
        },
      ],
    },
  ],
}

export default Destinations
