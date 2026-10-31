import type { GlobalConfig } from 'payload'

/** Data for the "Today in Kendhoo" strip: weather location, ferry timetable, prayer times. */
export const IslandInfo: GlobalConfig = {
  slug: 'island-info',
  label: 'Island info',
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          defaultValue: 5.3,
          admin: { description: 'Used for weather and prayer times.' },
        },
        { name: 'longitude', type: 'number', defaultValue: 73.0 },
      ],
    },
    {
      name: 'showWeather',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showFerry',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Turn on once the timetable below is filled in.' },
    },
    {
      name: 'ferries',
      label: 'Ferry timetable',
      type: 'array',
      admin: { description: 'Local time (Maldives, UTC+5), 24-hour format, e.g. 07:30.' },
      fields: [
        { name: 'time', type: 'text', required: true },
        { name: 'route', type: 'text', localized: true, required: true },
        {
          name: 'days',
          type: 'select',
          hasMany: true,
          defaultValue: ['0', '1', '2', '3', '4', '5', '6'],
          options: [
            { label: 'Sunday', value: '0' },
            { label: 'Monday', value: '1' },
            { label: 'Tuesday', value: '2' },
            { label: 'Wednesday', value: '3' },
            { label: 'Thursday', value: '4' },
            { label: 'Friday', value: '5' },
            { label: 'Saturday', value: '6' },
          ],
        },
      ],
    },
    {
      name: 'showPrayer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Off by default. Check the times against the official Maldives Islamic Ministry timetable before turning this on.',
      },
    },
    {
      name: 'prayerMethod',
      type: 'number',
      defaultValue: 1,
      admin: {
        description:
          'Aladhan calculation method id (1 = Karachi). Pick the one that matches the official Maldives times.',
      },
    },
  ],
}
