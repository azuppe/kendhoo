'use client'
// import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import RichText from '@/components/RichText'
import { motion } from 'framer-motion'

import { Fragment, useState } from 'react'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

export function LandingPage({ links, media, title, richText, ...props }: Page['hero']) {
  return (
    <div className="relative min-h-screen font-sans text-white">
      {media && typeof media === 'object' && (
        <div className="absolute pointer-events-none bg-black/30 left-0 bottom-0 w-full h-full ">
          <Media
            fill
            className="h-screen w-screen"
            videoClassName="h-screen w-screen object-cover"
            imgClassName="-z-10 object-cover"
            priority
            resource={media}
          />
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        </div>
      )}

      <div className="relative z-10 flex h-full space-y-14 flex-col min-h-screen  items-center justify-center text-center ">
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              delay: 0.1,
            },
          }}
          className="text-6xl md:text-[120px] lg:text-[180px] bg-clip-text text-transparent  bg-gradient-to-b from-transparent to to-white  mix-blend-difference  font-bold tracking-tight mb-4"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              delay: 0.3,
            },
          }}
          className="max-w-4xl text-lg flex flex-col items-center font-thin text-gray-300 mb-12"
        >
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink className={` rounded-full px-10 py-2 text-lg font-thin ${i==0?"bg-black":"bg-white text-gray-900"} `} {...link} />
                </li>
              )
            })}
          </ul>
        )}
        </motion.div>

      </div>
    </div>
  )
}
