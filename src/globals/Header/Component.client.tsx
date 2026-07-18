'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useLocale, useTranslations } from 'next-intl'
import localization from '@/i18n/localization'

import { ChevronDown, ExternalLink, Heart, SearchIcon, User, Waves } from 'lucide-react'
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
    <div className="fixed inset-x-0 top-0 z-50 bg-slate-950/35 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
      <header
        id="header"
        className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6"
      >
        <Link href="/" className="me-auto flex items-center gap-2 group shrink-0">
          <span className="p-2 bg-white/10 rounded-full border border-white/20 group-hover:bg-white/20 transition-colors">
            <Waves size={20} className="text-white" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-white/80 transition-colors">
            KendhooOnline
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-white/10">
          <HeaderNav header={header} />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/search"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="min-w-10 text-white" />
          </Link>
          <span className="hidden sm:flex items-center justify-center min-w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Heart className="w-5 text-white" />
          </span>
          <span className="hidden sm:flex items-center justify-center min-w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <User className="w-5 text-white" />
          </span>
          <LocaleSwitcher />
        </div>

        {/* Mobile nav toggle (optional, for future expansion) */}
      </header>
    </div>
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
      <SelectTrigger className="flex items-center whitespace-nowrap gap-1 bg-white/10 border-white/20 focus:outline-none text-white px-4 py-2 rounded-full hover:bg-white/20">
        <SelectValue placeholder="" />
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
