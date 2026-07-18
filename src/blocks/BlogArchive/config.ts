import type { Block } from 'payload'

export const BlogArchive: Block = {
  slug: 'blogArchive',
  interfaceName: 'BlogArchiveBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      localized: true,
      defaultValue: 'Latest News',
      admin: {
        description: 'Small pill label shown above the section, e.g. "Latest News".',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short line shown under the badge.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Large heading shown on the right, e.g. "What\'s Happening Across the Islands?".',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      label: 'Number Of Posts',
      admin: {
        description:
          'The most recent post is featured large; the next two appear as thumbnails; the fourth is shown as a highlighted excerpt.',
      },
    },
  ],
}

export default BlogArchive
