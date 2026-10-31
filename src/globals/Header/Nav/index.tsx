'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

function resolveHref(link: NonNullable<HeaderType['navItems']>[number]['link']): string {
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value?.slug
  ) {
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${
      link.reference.value.slug
    }`
  }
  return link.url || ''
}

export const HeaderNav: React.FC<{ header: HeaderType; variant?: 'row' | 'stacked' }> = ({
  header,
  variant = 'row',
}) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()

  return (
    <nav aria-label="Primary">
      <ul
        className={cn(
          'flex',
          variant === 'row' ? 'items-center gap-10' : 'flex-col items-stretch',
        )}
      >
        {navItems.map(({ link }, i) => {
          const href = resolveHref(link)
          const isActive = href === pathname || (href === '/' && pathname === '/')

          return (
            <li key={i}>
              <CMSLink
                className={cn(
                  'inline-flex items-center border-b py-2 text-[12px] font-medium uppercase transition-opacity hover:opacity-70',
                  variant === 'stacked' && 'w-full py-4 text-[13px]',
                  isActive ? 'border-current' : 'border-transparent',
                )}
                key={i}
                {...link}
                appearance="link"
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
