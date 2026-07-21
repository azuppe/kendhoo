import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'richTextBlock' }>

export const RichTextBlockComponent: React.FC<
  {
    id?: string
  } & Props
> = ({ richText }) => {
  return (
    <div className="container">
      {richText && <RichText content={richText} enableGutter={false} />}
    </div>
  )
}
