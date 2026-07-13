import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline Block',
    plural: 'Timeline Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
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
      admin: {
        description: 'e.g. Founded, important events, development milestones, infrastructure',
      },
    },
  ],
}

export default Timeline
