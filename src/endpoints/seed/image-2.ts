import type { Media } from '@/payload-types'

export const image2 = (locale: 'en' | 'dv'): Omit<Media, 'createdAt' | 'id' | 'updatedAt'> => ({
  alt: locale === 'en' ? 'Aerial view of a local island and harbor' : 'ރަށަކާއި ފަޅެއްގެ މަތިން ފެންނަ މަންޒަރު',
  caption: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: locale === 'en' ? 'Placeholder island photo.' : 'ރަށުގެ ނަމޫނާ ފޮޓޯއެއް.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
})
