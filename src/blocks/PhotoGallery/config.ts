import type { Block } from 'payload'

export const PhotoGallery: Block = {
  slug: 'photoGallery',
  interfaceName: 'PhotoGalleryBlock',
  labels: {
    singular: 'Photo Gallery Block',
    plural: 'Photo Gallery Blocks',
  },
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Up to 4 photos for the top gallery collage (1 large left, 1 large center, 2 stacked right).',
      },
    },
  ],
}

export default PhotoGallery
