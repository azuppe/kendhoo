import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText }) => {
  return (
    <div className="container ">
      <div className="bg-gray-50 rounded-[16px]  p-[56px] flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem]  space-y-1">
          <p className='text-gray-500 font-normal uppercase'>GET first updates</p>
          <p className='text-4xl font-bold text-gray-800'>View all news articles and post from kendhoo</p>
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink className='' appearance={'link'} key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
