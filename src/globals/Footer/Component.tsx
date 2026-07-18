import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { ArrowUpRight, Waves } from 'lucide-react'

import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'
import { LocaleSwitcher } from './LocaleSwitcher.client'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer = (await getCachedGlobal('footer', 1, locale)()) as FooterType

  const navItems = footer?.navItems || []
  const socialLinks = footer?.socialLinks || []

  return (
    <footer className="border-t border-gray-200 mt-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        <div className="flex flex-col gap-4 md:col-span-1">
          <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
            <Waves className="w-5 h-5 text-blue-600" />
          </span>

          {footer?.ctaHeading && (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 whitespace-pre-line">
              {footer.ctaHeading}
            </h2>
          )}

          {footer?.ctaDescription && (
            <p className="text-sm text-gray-500">{footer.ctaDescription}</p>
          )}

          {footer?.ctaButton?.url || footer?.ctaButton?.reference ? (
            <CMSLink
              {...footer.ctaButton}
              appearance="default"
              className="w-fit rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
            />
          ) : null}

          {(footer?.contactPrompt || footer?.contactEmail) && (
            <div className="pt-2 text-sm">
              {footer.contactPrompt && <p className="text-gray-500">{footer.contactPrompt}</p>}
              {footer.contactEmail && (
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="inline-flex items-center gap-1 font-medium text-gray-900 hover:text-blue-700"
                >
                  {footer.contactEmail}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          <div className="pt-2">
            <LocaleSwitcher />
          </div>
        </div>

        {(footer?.address || footer?.phone) && (
          <div className="flex flex-col gap-3 md:col-span-1">
            <span className="font-semibold text-gray-900">Contacts</span>
            {footer.address && (
              <p className="text-sm text-gray-500 whitespace-pre-line">{footer.address}</p>
            )}
            {footer.phone && (
              <a
                href={`tel:${footer.phone}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-700"
              >
                {footer.phone}
              </a>
            )}
            {footer.phoneNote && <span className="text-xs text-gray-400">{footer.phoneNote}</span>}
          </div>
        )}

        {!!socialLinks.length && (
          <div className="flex flex-col gap-3 md:col-span-1">
            <span className="font-semibold text-gray-900">Follow Us</span>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 w-fit text-sm text-gray-600 hover:text-blue-700 transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        )}

        {!!navItems.length && (
          <nav className="flex flex-col gap-3 md:col-span-1">
            {footer?.navColumnTitle && (
              <span className="font-semibold text-gray-900">{footer.navColumnTitle}</span>
            )}
            <div className="flex flex-col gap-2">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  className="w-fit text-sm text-gray-600 hover:text-blue-700 transition-colors"
                  key={i}
                  {...link}
                />
              ))}
            </div>
          </nav>
        )}
      </div>

      <div className="border-t border-gray-200 py-6 px-4 md:px-8 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {footer?.copyrightText && <span>{footer.copyrightText}</span>}
          {footer?.privacyPolicyUrl && (
            <Link href={footer.privacyPolicyUrl} className="underline hover:text-gray-600">
              {footer.privacyPolicyLabel || 'Privacy Policy'}
            </Link>
          )}
        </div>
        {footer?.creditText && (
          <div>
            {footer.creditUrl ? (
              <a
                href={footer.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                {footer.creditText}
              </a>
            ) : (
              <span>{footer.creditText}</span>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
