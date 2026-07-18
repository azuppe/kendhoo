import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateEvent } from './hooks/revalidateEvent'
import { slugField } from '@/fields/slug'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'events',
          locale: locale.code,
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data, { locale }) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'events',
        locale,
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'e.g. "Japan Express: Osaka to Tokyo"',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 1,
              maxRows: 4,
              admin: {
                description:
                  'Up to 4 photos for the top gallery collage (1 large left, 1 large center, 2 stacked right).',
              },
            },
            {
              name: 'breadcrumbs',
              type: 'array',
              admin: {
                description: 'e.g. "Classic", "Far East AU5"',
              },
              fields: [
                { name: 'label', type: 'text', localized: true, required: true },
                { name: 'url', type: 'text' },
              ],
            },
            {
              name: 'rating',
              type: 'number',
              admin: { description: 'e.g. 5' },
            },
            {
              name: 'reviewCount',
              type: 'number',
              admin: { description: 'e.g. 296' },
            },
            {
              name: 'tripMeta',
              type: 'array',
              maxRows: 4,
              admin: {
                description: 'Trip meta row, e.g. Duration / Group Size / Pacing / Accommodation.',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'duration',
                  options: [
                    { label: 'Duration', value: 'duration' },
                    { label: 'Group Size', value: 'groupSize' },
                    { label: 'Pacing', value: 'pacing' },
                    { label: 'Accommodation', value: 'accommodation' },
                  ],
                },
                { name: 'label', type: 'text', localized: true, admin: { description: 'e.g. "9 Days"' } },
                {
                  name: 'sublabel',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "Max 16, Aug 13"' },
                },
              ],
            },
          ],
        },
        {
          label: 'Trip Overview',
          fields: [
            {
              name: 'overviewTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Trip Overview',
            },
            {
              name: 'overviewDescription',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: "What's Included",
          fields: [
            {
              name: 'includedTitle',
              type: 'text',
              localized: true,
              defaultValue: "What's Included",
            },
            {
              name: 'includedItems',
              type: 'array',
              minRows: 1,
              admin: {
                description: 'e.g. "Japan Rail (JR) pass for 7 days", "8 nights hotel accommodation"',
              },
              fields: [{ name: 'label', type: 'text', localized: true, required: true }],
            },
          ],
        },
        {
          label: 'Itinerary',
          fields: [
            {
              name: 'itineraryTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Itinerary',
            },
            {
              name: 'itineraryItems',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'dayLabel',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Day 1" or "Day 4 - 5"' },
                },
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
              ],
            },
          ],
        },
        {
          label: 'Recommended For You',
          fields: [
            {
              name: 'recommendedTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Recommended for you',
            },
            {
              name: 'recommendedTours',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'badge', type: 'text', localized: true, admin: { description: 'e.g. "ON SALE"' } },
                { name: 'ageRange', type: 'text', admin: { description: 'e.g. "18-30s"' } },
                { name: 'title', type: 'text', localized: true, required: true },
                {
                  name: 'durationLabel',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "20 days"' },
                },
                {
                  name: 'route',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "Nairobi to Victoria Falls"' },
                },
                { name: 'price', type: 'number', required: true },
                { name: 'originalPrice', type: 'number' },
                { name: 'currency', type: 'text', defaultValue: 'USD' },
                { name: 'departsOn', type: 'text', localized: true },
                {
                  name: 'tags',
                  type: 'array',
                  fields: [{ name: 'label', type: 'text', localized: true }],
                },
                { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Book Adventure' },
                { name: 'link', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateEvent],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}

export default Events
