import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',

  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Landing',
          value: 'landing',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'HeroCarousel',
          value: 'heroCarousel',
        },
        {
          label: 'Adventure',
          value: 'adventure',
        },
        {
          label: 'Cosmetic',
          value: 'cosmetic',
        },
        {
          label: 'Event Details',
          value: 'eventDetails',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'posts',
      type: 'relationship',
      hasMany: true,
      relationTo: 'posts',
        admin: {
        condition: (_, { type } = {}) => ['heroCarousel'].includes(type),
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'landing', 'adventure', 'cosmetic', 'eventDetails'].includes(
            type,
          ),
        description:
          'For Event Details, this is the large center image in the gallery mosaic.',
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ['adventure', 'eventDetails'].includes(type),
        description:
          'Small pill label, e.g. "East Java\'s Natural Wonder" or "Top Rated" (Event Details)',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      admin: {
        condition: (_, { type } = {}) => ['adventure', 'cosmetic'].includes(type),
        description: 'Nav links shown over the hero image',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'avatars',
      type: 'array',
      maxRows: 5,
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
        description: 'Stacked avatar images for the "X People Joined" badge',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'joinedCount',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
        description: 'e.g. "50+"',
      },
    },
    {
      name: 'joinedLabel',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
        description: 'e.g. "People Joined"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ['adventure', 'cosmetic', 'eventDetails'].includes(type),
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'cosmetic',
        description: 'Phone number shown in the top nav, e.g. "+1 (555) 123-4567"',
      },
    },
    {
      name: 'doctorName',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'cosmetic',
        description: 'e.g. "Dr. Isabella Cruz, MD"',
      },
    },
    {
      name: 'doctorTitle',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'cosmetic',
        description: 'e.g. "Aesthetic Medicine & Dermatological Care"',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
        description: 'The larger, first card in the gallery strip',
      },
    },
    {
      name: 'featuredTitle',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
      },
    },
    {
      name: 'featuredDescription',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'adventure',
      },
    },
    {
      name: 'galleryImages',
      type: 'array',
      maxRows: 4,
      admin: {
        condition: (_, { type } = {}) => ['adventure', 'eventDetails'].includes(type),
        description:
          'The smaller image cards in the gallery strip. For Event Details, the first 2 form the left column and the last 2 form the right column around the center image.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'eventDetails',
        description: 'Breadcrumb label, e.g. "Classic"',
      },
    },
    {
      name: 'tripCode',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'eventDetails',
        description: 'e.g. "AJJR"',
      },
    },
    {
      name: 'quickStats',
      type: 'array',
      maxRows: 4,
      admin: {
        condition: (_, { type } = {}) => type === 'eventDetails',
        description:
          'Row of icon stats under the description, e.g. Duration, Group Size, Physical Rating, Accommodation',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name, e.g. Clock, Users, Activity, Building2',
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
    },
    {
      name: 'priceBox',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'eventDetails',
        description: 'The sticky booking card shown alongside the gallery',
      },
      fields: [
        {
          name: 'durationLabel',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "9 days"' },
        },
        {
          name: 'route',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Osaka to Tokyo"' },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'originalPrice',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'validOn',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Jul 31 2026"' },
        },
        {
          name: 'rating',
          type: 'number',
          admin: { step: 0.1, description: 'Out of 5' },
        },
        {
          name: 'reviewCount',
          type: 'number',
        },
        {
          name: 'includes',
          type: 'array',
          maxRows: 4,
          admin: {
            description: 'Small icon row, e.g. Flight Included, Hotels Comfortable Stay, Events Expert Guides',
          },
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: { description: 'Lucide icon name, e.g. Plane, Hotel, MapPin' },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  label: false,
}
