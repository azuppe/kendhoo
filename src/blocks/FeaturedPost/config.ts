import type { Block } from 'payload'

export const FeaturedPost: Block = {
  slug: 'featuredPost',
  interfaceName: 'FeaturedPostBlock',
  labels: {
    plural: 'Featured Post Blocks',
    singular: 'Featured Post',
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      admin: {
        description: 'Select the post to feature in this card.',
      },
    },
  ],
}

export default FeaturedPost
