import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
        { label: 'Promo', value: 'promo' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { style } = {}) => style === 'promo',
        description: 'Photo shown on the right side of the diagonal split',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { style } = {}) => style === 'promo',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { style } = {}) => style === 'promo',
        description: 'e.g. "Build a Wildly Successful Life Abroad!"',
      },
    },
  ],
  interfaceName: 'BannerBlock',
}
