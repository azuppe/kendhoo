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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations()

  useEffect(() => {
    const header = document.querySelector('#header')

    const handleOnScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
        header?.classList.add('shadow-sm')
        header?.classList.add('bg-white')
      } else {
          setScrolled(false);
        header?.classList.remove('shadow-sm')
        header?.classList.remove('bg-white')
      }
    }

    window.addEventListener('scroll', handleOnScroll)
   return ()=>{
    window.removeEventListener('scroll', handleOnScroll)
   }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4 transition-all duration-300">
      <header
        id="header"
        className="max-w-6xl mx-auto flex items-center justify-between gap-4 rounded-full border border-white/40 bg-white/60 backdrop-blur-lg px-4 py-2 md:px-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300"
      >
        <Link href="/" className="me-auto flex items-center gap-2 group shrink-0">
          <span className="p-2 bg-blue-100 rounded-full border border-blue-200 group-hover:bg-blue-200 transition-colors">
            <Waves size={20} className="text-blue-500" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-primary group-hover:text-blue-700 transition-colors">
            KendhooOnline
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          <HeaderNav header={header} />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/search"
            className="flex items-center gap-1 p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="w-5 text-blue-500" />
          </Link>
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
      <SelectTrigger className="flex items-center whitespace-nowrap gap-1 bg-black focus:outline-none text-white px-4 py-2 rounded-full hover:bg-gray-900">
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
