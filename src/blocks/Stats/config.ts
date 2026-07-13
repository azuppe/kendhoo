import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Your Trusted Partner In Seamless Travel"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "300+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'e.g. "Trips expertly managed"',
          },
        },
        link({ appearances: false, disableLabel: false }),
      ],
    },
  ],
}

export default Stats
