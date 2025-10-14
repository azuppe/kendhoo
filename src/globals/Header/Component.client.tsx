'use client'

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
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <header className="w-full sticky top-0 bg-white border-b  z-10 border-gray-200 shadow-sm">
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

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="flex items-center whitespace-nowrap gap-1 bg-white t border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50"
          >
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
          <LocaleSwitcher />
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
      <SelectTrigger className="flex items-center whitespace-nowrap gap-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="transparent rounded-[10px] focus:outline-none">
        {localization.locales
          .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
          .map((locale) => (
            <SelectItem
              className="cursor-pointer text-base font-normal text-gray-700"
              value={locale.code}
              key={locale.code}
            >
              {locale.code}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
