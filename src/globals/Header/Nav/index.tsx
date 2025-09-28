'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'


export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []


  return (
    <nav className="">
      <div className="flex gap-3 items-center w-full">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              className="px-4 py-1 rounded-full text-gray-700 hover:bg-gray-100"
              key={i}
              {...link}
              appearance="link"
            />
          )
        })}
      </div>
     
    </nav>
  )
}
