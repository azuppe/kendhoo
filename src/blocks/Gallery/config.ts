import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Small label above the title, e.g. "GALLERY". Only used by the Coverflow layout.',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    titleColorField,
    {
      name: 'description',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short subheading below the title. Only used by the Coverflow layout.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Slider', value: 'slider' },
        { label: 'Coverflow', value: 'coverflow' },
      ],
    },
    {
      name: 'viewMoreLabel',
      type: 'text',
      localized: true,
      defaultValue: 'View More',
      admin: {
        description: 'Only used by the Coverflow layout.',
        condition: (_, siblingData) => siblingData?.layout === 'coverflow',
      },
    },
    {
      name: 'viewMoreUrl',
      type: 'text',
      admin: {
        description: 'Only used by the Coverflow layout.',
        condition: (_, siblingData) => siblingData?.layout === 'coverflow',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
        {
          name: 'location',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Filter pill label for this image, e.g. "Italy", "Dubai". Only used by the Coverflow layout.',
          },
        },
        {
          name: 'isVideo',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Shows a play icon on the card. Only used by the Coverflow layout.',
          },
        },
      ],
    },
  ],
}

export default Gallery
