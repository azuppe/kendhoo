import type { Block } from 'payload'

export const EditorsPick: Block = {
  slug: 'editorsPick',
  interfaceName: 'EditorsPickBlock',
  labels: {
    plural: 'Editor’s Pick Blocks',
    singular: 'Editor’s Pick',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Editor’s Pick',
    },
    {
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      admin: {
        description: 'The large, featured post shown at the top of the section.',
      },
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      minRows: 1,
      maxRows: 4,
      required: true,
      admin: {
        description: 'Select up to 4 posts to show in the grid below the featured post.',
      },
    },
  ],
}

export default EditorsPick
