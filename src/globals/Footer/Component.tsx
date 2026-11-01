import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'
import { LocaleSwitcher } from './LocaleSwitcher.client'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footer = (await getCachedGlobal('footer', 1, locale)()) as FooterType

  const navItems = footer?.navItems || []
  const socialLinks = footer?.socialLinks || []

  const heading = 'eyebrow mb-1'
  const linkCls =
    'w-fit py-2 text-[15px] text-foreground transition-opacity hover:opacity-60'

  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="container mx-auto grid grid-cols-1 gap-16 px-4 py-20 md:grid-cols-12 md:px-8">
        <div className="flex flex-col gap-6 md:col-span-5">
          <Link href="/" aria-label="Kendhoo Online" className="w-fit hover:opacity-80">
            <Logo />
          </Link>

          {footer?.ctaHeading && (
            <h2 className="max-w-md whitespace-pre-line text-4xl">{footer.ctaHeading}</h2>
          )}

          {footer?.ctaDescription && (
            <p className="max-w-md text-[15px] text-muted-foreground">{footer.ctaDescription}</p>
          )}

          {footer?.ctaButton?.url || footer?.ctaButton?.reference ? (
            <CMSLink {...footer.ctaButton} appearance="default" className="w-fit" />
          ) : null}

          {(footer?.contactPrompt || footer?.contactEmail) && (
            <div className="text-[15px]">
              {footer.contactPrompt && (
                <p className="text-muted-foreground">{footer.contactPrompt}</p>
              )}
              {footer.contactEmail && (
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="inline-flex items-center gap-1 border-b border-foreground py-1 hover:opacity-60"
                >
                  {footer.contactEmail}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}
        </div>

        {(footer?.address || footer?.phone) && (
          <div className="flex flex-col gap-3 md:col-span-2 md:col-start-7">
            <span className={heading}>Contacts</span>
            {footer.address && (
              <p className="whitespace-pre-line text-[15px] text-foreground">{footer.address}</p>
            )}
            {footer.phone && (
              <a href={`tel:${footer.phone}`} className="font-serif text-2xl hover:opacity-60">
                {footer.phone}
              </a>
            )}
            {footer.phoneNote && (
              <span className="text-xs text-muted-foreground">{footer.phoneNote}</span>
            )}
          </div>
        )}

        {!!socialLinks.length && (
          <div className="flex flex-col gap-1 md:col-span-2">
            <span className={heading}>Follow</span>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} inline-flex items-center gap-1`}
              >
                {social.label}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        )}

        {!!navItems.length && (
          <nav className="flex flex-col gap-1 md:col-span-2">
            {footer?.navColumnTitle && <span className={heading}>{footer.navColumnTitle}</span>}
            {navItems.map(({ link }, i) => (
              <CMSLink className={linkCls} key={i} {...link} />
            ))}
          </nav>
        )}
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-[11px] uppercase tracking-[0.06em] text-muted-foreground md:flex-row md:px-8">
          <div className="flex items-center gap-6">
            {footer?.copyrightText && <span>{footer.copyrightText}</span>}
            {footer?.privacyPolicyUrl && (
              <Link href={footer.privacyPolicyUrl} className="hover:text-foreground">
                {footer.privacyPolicyLabel || 'Privacy Policy'}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-8">
            <LocaleSwitcher />
            {footer?.creditText &&
              (footer.creditUrl ? (
                <a
                  href={footer.creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  {footer.creditText}
                </a>
              ) : (
                <span>{footer.creditText}</span>
              ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
