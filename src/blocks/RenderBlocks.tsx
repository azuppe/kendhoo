import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BlogArchiveBlock } from '@/blocks/BlogArchive/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

import { FaqBlock } from '@/blocks/Faq/Component'
import { QuickFactsBlock } from '@/blocks/QuickFacts/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { PlacesGridBlock } from '@/blocks/PlacesGrid/Component'
import { BusinessDirectoryBlock } from '@/blocks/BusinessDirectory/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { ContactInfoBlock } from '@/blocks/ContactInfo/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TypedLocale } from 'payload'

const blockComponents = {
  archive: ArchiveBlock,
  blogArchive: BlogArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  faq: FaqBlock,
  quickFacts: QuickFactsBlock,
  gallery: GalleryBlock,
  placesGrid: PlacesGridBlock,
  businessDirectory: BusinessDirectoryBlock,
  timeline: TimelineBlock,
  contactInfo: ContactInfoBlock,
  testimonials: TestimonialsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
