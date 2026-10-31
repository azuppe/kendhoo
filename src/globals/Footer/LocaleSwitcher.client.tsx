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
    <div className="inline-flex items-center gap-5">
      {localization.locales.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onSelect(l.code as TypedLocale)}
          className={cn(
            'min-h-11 border-b text-[12px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70',
            locale === l.code
              ? 'border-foreground text-foreground'
              : 'border-transparent text-muted-foreground',
          )}
        >
          {l.code}
        </button>
      ))}
    </div>
  )
}
