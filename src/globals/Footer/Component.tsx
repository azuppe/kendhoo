import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer: Footer = await getCachedGlobal('footer', 1, locale)()

  const navItems = footer?.navItems || []

  return (
    // <footer className="border-t border-border  text-white">
    //   <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
    //     <Link className="flex items-center" href="/">
    //       <h1 className="text-4xl flex shrink-0 font-bold">AeroSense</h1>
    //     </Link>

    //     <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
    //       <ThemeSelector />

    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex-shrink-0">
          <h1 className="text-4xl font-bold">Kendhoo</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          <nav className="flex flex-col  gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-black" key={i} {...link} />
            })}
          </nav>

          <ul className="space-y-3 text-gray-700">
            <li>
              <a href="#" className="hover:text-black underline">
                X-Twitter ↗
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black underline">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black underline">
                Facebook ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 py-6 px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className='flex items-center gap-10'>
          <div>
            © 2024 All rights reserved.
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </div>
          <div>
            <span>(480) 555-0103</span> •
            <a href="mailto:hello@aerosense.com" className="hover:text-black">
              hello@kedhoo.com
            </a>
          </div>
        </div>
        <div>------------</div>
      </div>
    </footer>
  )
}
