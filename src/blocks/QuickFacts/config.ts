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
      name: 'layout',
      type: 'select',
      defaultValue: 'stats',
      options: [
        { label: 'Stats (icon + value cards)', value: 'stats' },
        { label: 'Mosaic (photo & text collage)', value: 'mosaic' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Stats layout only. Intro paragraph(s) shown next to the stats, e.g. an "About Us" blurb.',
        condition: (_, siblingData) => siblingData?.layout !== 'mosaic',
      },
    },
    {
      name: 'button',
      type: 'group',
      admin: {
        description: 'Stats layout only. Optional call-to-action shown under the description.',
        condition: (_, siblingData) => siblingData?.layout !== 'mosaic',
      },
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Stats layout only. Large background photo of the collage.',
        condition: (_, siblingData) => siblingData?.layout !== 'mosaic',
      },
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Stats layout only. Smaller rotated photo overlapping the first.',
        condition: (_, siblingData) => siblingData?.layout !== 'mosaic',
      },
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
            description: 'Stats layout only. Lucide icon name, e.g. Users, MapPin, Ship, Plane, Globe, Clock',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            description: 'Stats layout: the value\'s caption. Mosaic layout: the tile heading, e.g. "SPA".',
          },
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          admin: {
            description: 'Stats layout only, e.g. "12,000".',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Mosaic layout only. Short paragraph shown under the tile heading.',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Photo tile', value: 'image' },
            { label: 'Color tile', value: 'color' },
          ],
          admin: {
            description: 'Mosaic layout only.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Mosaic layout, photo tile only.',
            condition: (_, siblingData) => siblingData?.variant !== 'color',
          },
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'blue',
          options: [
            { label: 'Black', value: 'blue' },
            { label: 'White', value: 'white' },
          ],
          admin: {
            description: 'Mosaic layout, color tile only.',
            condition: (_, siblingData) => siblingData?.variant === 'color',
          },
        },
        {
          name: 'span',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Normal (1x1)', value: 'normal' },
            { label: 'Wide (2x1)', value: 'wide' },
            { label: 'Tall (1x2)', value: 'tall' },
          ],
          admin: {
            description: 'Mosaic layout only. Controls how many grid cells this tile fills.',
          },
        },
        {
          name: 'button',
          type: 'group',
          admin: {
            description: 'Mosaic layout only. Optional call-to-action shown on the tile.',
          },
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'url', type: 'text' },
          ],
        },
      ],
      admin: {
        description:
          'Stats layout e.g. Population, Size, Atoll, Distance from Malé, Ferry Duration, Speedboat Duration, Airport, Time Zone, Language, Currency, Island Code. Mosaic layout e.g. Spa, Explore, Native Cuisine, Weddings, Luxury Resorts.',
      },
    },
  ],
}

export default QuickFacts
