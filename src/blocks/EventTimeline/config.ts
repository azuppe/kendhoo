import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const EventTimeline: Block = {
  slug: 'eventTimeline',
  interfaceName: 'EventTimelineBlock',
  labels: {
    singular: 'Event Timeline Block',
    plural: 'Event Timeline Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Itinerary"',
      },
    },
    titleColorField,
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'dayLabel',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Day 1" or "Day 4 - 5"',
          },
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
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
  ],
}

export default EventTimeline
