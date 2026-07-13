import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const WhyUs: Block = {
  slug: 'whyUs',
  interfaceName: 'WhyUsBlock',
  labels: {
    singular: 'Why Us Block',
    plural: 'Why Us Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Why Aviatour"',
      },
    },
    {
      name: 'items',
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
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Discover Your Perfect Place"',
      },
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      localized: true,
    },
    linkGroup({
      overrides: {
        name: 'ctaLink',
        maxRows: 1,
      },
    }),
  ],
}

export default WhyUs
