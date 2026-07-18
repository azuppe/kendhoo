import type { Block } from 'payload'

import { link } from '@/fields/link'

export const LatestNewsV2: Block = {
  slug: 'latestNewsV2',
  interfaceName: 'LatestNewsV2Block',
  labels: {
    plural: 'Latest News V2 Blocks',
    singular: 'Latest News V2',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Latest News',
      admin: {
        description: 'Large heading shown on the left, e.g. "Latest News".',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short paragraph shown under the heading.',
      },
    },
    link({
      appearances: false,
    }),
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      label: 'Number Of Posts',
      admin: {
        description: 'How many recent posts to list on the right.',
      },
    },
  ],
}

export default LatestNewsV2
