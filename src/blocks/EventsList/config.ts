import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const EventsList: Block = {
  slug: 'eventsList',
  interfaceName: 'EventsListBlock',
  labels: {
    singular: 'Events List Block',
    plural: 'Events List Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Upcoming Events',
    },
    titleColorField,
    {
      name: 'events',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the events to display in this list.',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      localized: true,
      defaultValue: 'View Event',
    },
  ],
}

export default EventsList
