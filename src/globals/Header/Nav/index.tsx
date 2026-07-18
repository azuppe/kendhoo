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

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()

  return (
    <nav>
      <div className="flex items-center w-full">
        {navItems.map(({ link }, i) => {
          const href = resolveHref(link)
          const isActive = href === pathname || (href === '/' && pathname === '/')

          return (
            <CMSLink
              className={cn(
                'text-sm font-medium rounded-full px-4 py-2 transition-colors duration-150',
                isActive
                  ? 'bg-white text-slate-900 hover:text-slate-900'
                  : 'text-white/70 hover:text-white',
              )}
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
