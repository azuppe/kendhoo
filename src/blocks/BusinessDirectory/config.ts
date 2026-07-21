import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const BusinessDirectory: Block = {
  slug: 'businessDirectory',
  interfaceName: 'BusinessDirectoryBlock',
  labels: {
    singular: 'Business Directory Block',
    plural: 'Business Directory Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    titleColorField,
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Restaurants & Cafes', value: 'restaurant' },
        { label: 'Shops', value: 'shop' },
        { label: 'Accommodation', value: 'accommodation' },
        { label: 'Services', value: 'service' },
      ],
      defaultValue: 'all',
    },
    {
      name: 'island',
      type: 'relationship',
      relationTo: 'islands' as any,
      admin: {
        description: 'Leave empty to show businesses from all islands',
      },
    },
    {
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show only Featured Businesses',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
    },
  ],
}

export default BusinessDirectory
