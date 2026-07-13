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
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default ContactInfo
