import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BlogArchive: Block = {
  slug: 'blogArchive',
  interfaceName: 'BlogArchiveBlock',
  fields: [
    {
      name: 'introContent',
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
      label: 'Intro Content',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      label: 'Posts Per Page',
    },
    {
      name: 'showCategories',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Category Filter',
    },
    {
      name: 'showIslands',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Island Filter',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Featured Categories',
      admin: {
        description: 'Leave empty to show all categories',
      },
    },
    {
      name: 'islands',
      type: 'relationship',
      relationTo: 'islands' as any,
      hasMany: true,
      label: 'Featured Islands',
      admin: {
        description: 'Leave empty to show all islands',
      },
    },
  ],
}
