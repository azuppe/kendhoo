import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const PlacesGrid: Block = {
  slug: 'placesGrid',
  interfaceName: 'PlacesGridBlock',
  labels: {
    singular: 'Places Grid Block',
    plural: 'Places Grid Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    titleColorField,
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'thingsToDo',
      options: [
        { label: 'Things To Do', value: 'thingsToDo' },
        { label: 'Places To Visit', value: 'placesToVisit' },
        { label: 'Beaches', value: 'beach' },
      ],
    },
    {
      name: 'island',
      type: 'relationship',
      relationTo: 'islands' as any,
      admin: {
        description: 'Leave empty to show places from all islands',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
    },
  ],
}

export default PlacesGrid
