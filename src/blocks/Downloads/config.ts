import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const Downloads: Block = {
  slug: 'downloads',
  interfaceName: 'DownloadsBlock',
  labels: { singular: 'Downloads', plural: 'Downloads' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Downloads' },
    titleColorField,
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'files',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', localized: true },
        {
          name: 'category',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Forms", "Reports", "Maps"' },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Upload a PDF, document or any other file.' },
        },
        {
          name: 'externalUrl',
          type: 'text',
          admin: { description: 'Used when no file is uploaded.' },
        },
      ],
    },
  ],
}
