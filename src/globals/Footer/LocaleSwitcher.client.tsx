'use client'

import React, { useTransition } from 'react'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { TypedLocale } from 'payload'

import localization from '@/i18n/localization'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

export const LocaleSwitcher: React.FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [, startTransition] = useTransition()

  function onSelect(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- validated at runtime for the current route
        { pathname, params },
        { locale: value },
      )
    })
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1">
      {localization.locales.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onSelect(l.code as TypedLocale)}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium uppercase transition-colors',
            locale === l.code ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600',
          )}
        >
          {l.code}
        </button>
      ))}
    </div>
  )
}
