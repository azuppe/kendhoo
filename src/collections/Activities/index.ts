import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateActivity } from './hooks/revalidateActivity'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: 'Activity',
    plural: 'Things To Do',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'island', 'difficulty', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'activities',
          locale: locale.code,
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data, { locale }) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'activities',
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
        description: 'e.g. "Snorkelling in Kendhoo"',
      },
    },
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'intro',
              type: 'text',
              localized: true,
              admin: {
                description:
                  'One-sentence introduction, e.g. "Explore the clear lagoon and colourful house reef with trusted local guides."',
              },
            },
            {
              name: 'categoryTag',
              type: 'text',
              localized: true,
              admin: {
                description: 'e.g. "Ocean & Adventure"',
              },
            },
          ],
        },
        {
          label: 'Quick Info',
          fields: [
            {
              name: 'island',
              type: 'relationship',
              relationTo: 'islands' as any,
            },
            {
              name: 'locationLabel',
              type: 'text',
              localized: true,
              admin: {
                description: 'Overrides the island name if set, e.g. "B. Kendhoo, Maldives"',
              },
            },
            {
              name: 'duration',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "1.5 - 2.5 hours"' },
            },
            {
              name: 'bestTime',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "Year-round" or "Morning"' },
            },
            {
              name: 'priceRange',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "From MVR 350"' },
            },
            {
              name: 'difficulty',
              type: 'select',
              defaultValue: 'easy',
              options: [
                { label: 'Easy', value: 'easy' },
                { label: 'Moderate', value: 'moderate' },
                { label: 'Challenging', value: 'challenging' },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              localized: true,
              defaultValue: 'About this experience',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'Two or three short paragraphs (separate with a blank line): what visitors will experience, what makes it special here, and who it suits (beginners, children, families).',
              },
            },
            {
              name: 'highlightsTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Highlights',
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [{ name: 'label', type: 'text', localized: true, required: true }],
              admin: {
                description: 'e.g. "Suitable for beginners and families"',
              },
            },
          ],
        },
        {
          label: 'Service Providers',
          fields: [
            {
              name: 'providersTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Local service providers',
            },
            {
              name: 'providers',
              type: 'array',
              admin: {
                description:
                  'Every provider is shown directly on the page. Avoid ranking one above others unless there is a clear reason (mark it Verified instead).',
              },
              fields: [
                { name: 'name', type: 'text', localized: true, required: true },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'startingPrice',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "From MVR 350"' },
                },
                {
                  name: 'duration',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "1.5 - 2 hours"' },
                },
                {
                  name: 'included',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "Snorkel gear, guide, water"' },
                },
                {
                  name: 'availableTimes',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "Daily, 8am - 4pm"' },
                },
                { name: 'phone', type: 'text' },
                { name: 'whatsapp', type: 'text', admin: { description: 'Phone number in international format, e.g. 9609991234' } },
                { name: 'verified', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'galleryImages',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: {
                description: 'Activity, underwater, location photos, and photos submitted by local providers.',
              },
            },
          ],
        },
        {
          label: 'Before You Go',
          fields: [
            {
              name: 'beforeYouGoTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Before you go',
            },
            {
              name: 'beforeYouGoItems',
              type: 'array',
              admin: {
                description:
                  'What to bring, recommended clothing, minimum age, swimming requirements, weather limitations, safety information.',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'info',
                  options: [
                    { label: 'Sunscreen', value: 'sunscreen' },
                    { label: 'Clothing', value: 'clothing' },
                    { label: 'Weather', value: 'weather' },
                    { label: 'Safety', value: 'safety' },
                    { label: 'Age', value: 'age' },
                    { label: 'Swimming', value: 'swimming' },
                    { label: 'Time', value: 'time' },
                    { label: 'Info', value: 'info' },
                  ],
                },
                { name: 'label', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'locationTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Location',
            },
            {
              name: 'locationDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Meeting location and simple directions from the harbour.',
              },
            },
            {
              name: 'locationNote',
              type: 'text',
              localized: true,
              defaultValue: 'The exact meeting point may depend on the chosen provider.',
            },
            {
              name: 'mapImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Static map preview image (optional).' },
            },
            {
              name: 'mapLink',
              type: 'text',
              admin: { description: 'URL for the "View on map" button, e.g. a Google Maps link.' },
            },
            {
              name: 'coordinates',
              type: 'group',
              fields: [
                { name: 'latitude', type: 'number', admin: { step: 0.0001 } },
                { name: 'longitude', type: 'number', admin: { step: 0.0001 } },
              ],
            },
          ],
        },
        {
          label: 'Related Activities',
          fields: [
            {
              name: 'relatedTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Related activities',
            },
            {
              name: 'relatedActivities',
              type: 'relationship',
              relationTo: 'activities' as any,
              hasMany: true,
              maxRows: 3,
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
  ],
  hooks: {
    afterChange: [revalidateActivity],
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

export default Activities
