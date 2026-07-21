import type { Block } from 'payload'

export const SocialEmbed: Block = {
  slug: 'socialEmbed',
  interfaceName: 'SocialEmbedBlock',
  labels: {
    singular: 'Social Embed',
    plural: 'Social Embeds',
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Twitter / X', value: 'twitter' },
      ],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description:
          'Paste the full post URL, e.g. https://www.youtube.com/watch?v=... or https://x.com/user/status/...',
      },
    },
  ],
}
