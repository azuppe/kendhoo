import type { Block } from 'payload'

export const QuickFacts: Block = {
  slug: 'quickFacts',
  interfaceName: 'QuickFactsBlock',
  labels: {
    singular: 'Quick Facts Block',
    plural: 'Quick Facts Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'facts',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name, e.g. Users, MapPin, Ship, Plane, Globe, Clock',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
      admin: {
        description:
          'e.g. Population, Size, Atoll, Distance from Malé, Ferry Duration, Speedboat Duration, Airport, Time Zone, Language, Currency, Island Code',
      },
    },
  ],
}

export default QuickFacts
