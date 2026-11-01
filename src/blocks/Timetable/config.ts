import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const Timetable: Block = {
  slug: 'timetable',
  interfaceName: 'TimetableBlock',
  labels: { singular: 'Timetable', plural: 'Timetables' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Timetable' },
    titleColorField,
    {
      name: 'description',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Ferry schedule, effective November 2026"' },
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'time', type: 'text', required: true, admin: { description: 'e.g. "07:30"' } },
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Kendhoo → Malé"' } },
        { name: 'days', type: 'text', localized: true, admin: { description: 'e.g. "Daily" or "Sun, Tue, Thu"' } },
        { name: 'note', type: 'text', localized: true },
      ],
    },
  ],
}
