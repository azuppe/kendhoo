import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const UsefulNumbers: Block = {
  slug: 'usefulNumbers',
  interfaceName: 'UsefulNumbersBlock',
  labels: { singular: 'Useful Numbers', plural: 'Useful Numbers' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Useful Numbers' },
    titleColorField,
    {
      name: 'contacts',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'detail', type: 'text', localized: true, admin: { description: 'e.g. "24 hours"' } },
        { name: 'phone', type: 'text', required: true },
        { name: 'emergency', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
