import { Block } from "payload"

const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
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
        {
          name: 'link',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'learnMoreUrl',
      type: 'text',
      required: false,
    },
  ],
}

export default FaqBlock
