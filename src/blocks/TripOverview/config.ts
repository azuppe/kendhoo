import type { Block } from 'payload'

export const TripOverview: Block = {
  slug: 'tripOverview',
  interfaceName: 'TripOverviewBlock',
  labels: {
    singular: 'Trip Overview Block',
    plural: 'Trip Overview Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Trip Overview',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}

export default TripOverview
