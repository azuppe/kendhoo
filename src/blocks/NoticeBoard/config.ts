import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const NoticeBoard: Block = {
  slug: 'noticeBoard',
  interfaceName: 'NoticeBoardBlock',
  labels: { singular: 'Notice Board', plural: 'Notice Boards' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Notice Board' },
    titleColorField,
    {
      name: 'notices',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', localized: true },
        {
          name: 'category',
          type: 'select',
          defaultValue: 'general',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Urgent', value: 'urgent' },
            { label: 'Council', value: 'council' },
            { label: 'Utilities', value: 'utilities' },
            { label: 'Health', value: 'health' },
            { label: 'Transport', value: 'transport' },
            { label: 'Community', value: 'community' },
          ],
        },
        { name: 'date', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
        {
          name: 'expires',
          type: 'date',
          admin: {
            description: 'Optional. The notice is hidden after this date.',
            date: { pickerAppearance: 'dayOnly' },
          },
        },
        { name: 'pinned', type: 'checkbox', defaultValue: false },
        { name: 'linkLabel', type: 'text', localized: true },
        { name: 'linkUrl', type: 'text' },
      ],
    },
  ],
}
