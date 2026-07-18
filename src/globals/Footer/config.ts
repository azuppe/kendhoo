import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaHeading',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'ctaDescription',
      type: 'text',
      localized: true,
    },
    link({
      overrides: {
        name: 'ctaButton',
        label: 'CTA Button',
      },
    }),
    {
      name: 'contactPrompt',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Do you have more questions? Send us an email!"' },
    },
    {
      name: 'contactEmail',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'phoneNote',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Questions and suggestions"' },
    },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'navColumnTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'privacyPolicyLabel',
          type: 'text',
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'privacyPolicyUrl',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'creditText',
          type: 'text',
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'creditUrl',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
