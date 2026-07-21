import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const WhatsIncluded: Block = {
  slug: 'whatsIncluded',
  interfaceName: 'WhatsIncludedBlock',
  labels: {
    singular: "What's Included Block",
    plural: "What's Included Blocks",
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: "What's Included",
    },
    titleColorField,
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
      admin: {
        description: 'e.g. "Japan Rail (JR) pass for 7 days", "8 nights hotel accommodation"',
      },
    },
  ],
}

export default WhatsIncluded
