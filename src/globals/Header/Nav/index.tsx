'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'


export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []


  return (
    <nav>
      <div className="flex gap-1 md:gap-2 items-center w-full">
        {navItems.map(({ link }, i) => (
          <CMSLink
            className="px-4 py-1 md:px-5 md:py-2 rounded-full font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
            key={i}
            {...link}
            appearance="link"
          />
        ))}
      </div>
    </nav>
  )
}
