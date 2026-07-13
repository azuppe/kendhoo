import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

const Places: CollectionConfig = {
  slug: 'places',
  labels: {
    singular: 'Place',
    plural: 'Places',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'island'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    ...slugField(),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'thingsToDo',
      options: [
        { label: 'Things To Do', value: 'thingsToDo' },
        { label: 'Places To Visit', value: 'placesToVisit' },
        { label: 'Beach', value: 'beach' },
      ],
    },
    {
      name: 'island',
      type: 'relationship',
      relationTo: 'islands' as any,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number', admin: { step: 0.0001 } },
        { name: 'longitude', type: 'number', admin: { step: 0.0001 } },
      ],
    },
    {
      name: 'openingHours',
      type: 'text',
      localized: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', localized: true }],
      admin: {
        description: 'e.g. Swimming, Sunset, Family Friendly, Snorkeling, Drone Photos',
      },
    },
  ],
}

export default Places
