import { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'FAQ',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        description: 'e.g. "Frequently Asked"',
      },
    },
    {
      name: 'titleAccent',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        description: 'Rendered in italic serif on its own line, e.g. "Questions"',
      },
    },
    titleColorField,
    {
      name: 'email',
      type: 'text',
      admin: {
        description: 'e.g. "hello@vistaire.com"',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Get in touch',
      localized: true,
    },
    {
      name: 'ctaLink',
      type: 'text',
      admin: {
        description: 'e.g. "mailto:hello@vistaire.com"',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo shown alongside the FAQ list',
      },
    },
    {
      name: 'imageCaption',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "@skyline.villas"',
      },
    },
    {
      name: 'signatureName',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional cursive signature shown below the section, e.g. "crafted setared"',
      },
    },
    {
      name: 'signatureTagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "for real estate"',
      },
    },
  ],
}

export default FaqBlock
