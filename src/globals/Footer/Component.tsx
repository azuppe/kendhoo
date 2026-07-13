import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer: Footer = await getCachedGlobal('footer', 1, locale)()

  const navItems = footer?.navItems || []

  return (
    <footer className="bg-gradient-to-t from-blue-50 via-white to-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-extrabold tracking-tight text-blue-700">KendhooOnline</span>
          <span className="text-gray-500">Your local island blog</span>
        </div>
        <nav className="flex flex-col gap-2 md:col-span-1">
          <span className="font-semibold text-gray-700 mb-2">Navigation</span>
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ link }, i) => (
              <CMSLink className="px-3 py-1 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors" key={i} {...link} />
            ))}
          </div>
        </nav>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-700 mb-2">Follow us</span>
          <div className="flex gap-3">
            <Link href="#" className="hover:text-blue-700 transition-colors" aria-label="Twitter">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M22 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12.03 9.5c0 .352.04.695.116 1.022C8.728 10.37 5.7 8.74 3.671 6.25a4.48 4.48 0 0 0-.607 2.257c0 1.557.793 2.933 2.002 3.74a4.48 4.48 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.07a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.94 8.94 0 0 1-2.6.713Z" fill="currentColor"/></svg>
            </Link>
            <Link href="#" className="hover:text-blue-700 transition-colors" aria-label="LinkedIn">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.67a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm15.11 12.78h-3.56v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.39-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24Z" fill="currentColor"/></svg>
            </Link>
            <Link href="#" className="hover:text-blue-700 transition-colors" aria-label="Facebook">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" fill="currentColor"/></svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 py-6 px-4 md:px-8 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span>© 2024 KendhooOnline. All rights reserved.</span>
          <a href="#" className="underline hover:text-blue-700">Privacy Policy</a>
        </div>
        <div className="flex items-center gap-2">
          <span>Contact:</span>
          <a href="mailto:hello@kendhoo.com" className="hover:text-blue-700">hello@kendhoo.com</a>
        </div>
      </div>
    </footer>
  )
}
