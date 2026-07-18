import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Info Block',
    plural: 'Contact Info Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Large background photo' },
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Smaller overlapping photo' },
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: {
        description: 'Google Maps embed URL',
      },
    },
    {
      name: 'emergencyContacts',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'e.g. Hospital, Police, Fire, Council, Harbor Master' },
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'shield',
          options: [
            { label: 'Police (shield)', value: 'shield' },
            { label: 'Fire/Ambulance (flame)', value: 'flame' },
            { label: 'Coast Guard (life buoy)', value: 'lifeBuoy' },
            { label: 'Hospital (cross)', value: 'cross' },
            { label: 'Other (phone)', value: 'phone' },
          ],
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'emergencyNoteTitle',
      type: 'text',
      localized: true,
      defaultValue: 'In an emergency?',
    },
    {
      name: 'emergencyNoteDescription',
      type: 'text',
      localized: true,
      defaultValue:
        'Please call the relevant emergency number immediately. We\'re here to help keep everyone safe.',
    },
  ],
}

export default ContactInfo
