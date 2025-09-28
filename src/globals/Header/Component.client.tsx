'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useLocale, useTranslations } from 'next-intl'
import localization from '@/i18n/localization'

import { ChevronDown, ExternalLink, SearchIcon, Waves } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const t = useTranslations()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    // <header
    //   className="container  z-20 py-8 flex justify-end gap-2"
    //   {...(theme ? { 'data-theme': theme } : {})}
    // >
    //
    //     <Logo />
    //   </Link>
    //
    //
    // </header>

    <header className="w-full bg-white border-b relative z-10 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="me-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">KendhooOnline</span>
            <div className="p-2 border rounded-full">
              <Waves size={18} />
            </div>
          </div>
        </Link>

        <nav className="hidden w-full md:flex items-center justify-center gap-4">
          <HeaderNav header={header} />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center whitespace-nowrap gap-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
          >
            Try our app <ExternalLink size={16} />
          </a>

          <LocaleSwitcher />

          <Link href="/search">
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  )
}

function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      )
    })
  }

  return (
    <Select onValueChange={onSelectChange} value={locale}>
      <SelectTrigger className="w-auto text-sm bg-transparent focus:outline-none gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {localization.locales
          .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
          .map((locale) => (
            <SelectItem value={locale.code} key={locale.code}>
              {locale.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
