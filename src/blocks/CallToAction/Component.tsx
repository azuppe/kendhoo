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
        <div className="flex flex-wrap gap-4">
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <filter id="wavy-cta">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="1" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          {(links || []).map(({ link }, i) => {
            return (
              <span key={i} className="inline-block [filter:url(#wavy-cta)]">
                <CMSLink
                  className={
                    i === 0
                      ? 'rounded-full bg-gray-900 text-white px-8 py-2.5 font-semibold hover:bg-black border-0'
                      : 'rounded-full border-2 border-gray-900 bg-transparent text-gray-900 px-8 py-2.5 font-semibold hover:bg-gray-50'
                  }
                  appearance={i === 0 ? 'default' : 'outline'}
                  size="lg"
                  {...link}
                />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
