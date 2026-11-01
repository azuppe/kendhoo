'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { useLocale, useTranslations } from 'next-intl'
import localization from '@/i18n/localization'

import { Menu, SearchIcon, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { SavedLink } from '@/components/Saved/SavedLink'
import { ThemeToggle } from '@/components/Theme/ThemeToggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const pathname = usePathname()
  const t = useTranslations()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The home page opens on a full-bleed photograph: let the header float over it until scrolled.
  const overHero = pathname === '/' && !scrolled && !mobileNavOpen

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        overHero
          ? 'border-b border-transparent bg-transparent text-white'
          : 'border-b border-border bg-background/95 text-foreground backdrop-blur',
      )}
    >
      <header
        id="header"
        className="container mx-auto flex h-20 items-center justify-between gap-6 px-4 md:px-8"
      >
        <Link href="/" aria-label="Kendhoo Online" className="me-auto shrink-0 hover:opacity-80">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <HeaderNav header={header} />
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <Link
            href="/search"
            className="flex h-11 w-11 items-center justify-center hover:opacity-70"
          >
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <SavedLink />
          <ThemeToggle />
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center hover:opacity-70 md:hidden"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav-panel"
          >
            <span className="sr-only">{mobileNavOpen ? t('close') : t('menu')}</span>
            {mobileNavOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div
          id="mobile-nav-panel"
          className="flex min-h-[calc(100vh-5rem)] flex-col gap-8 border-t border-border bg-background px-6 py-8 text-foreground md:hidden"
        >
          <HeaderNav header={header} variant="stacked" />
          <div className="mt-auto flex justify-start sm:hidden">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </div>
  )
}

function LocaleSwitcher({ className }: { className?: string }) {
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
      <SelectTrigger
        className={cn(
          'flex h-11 items-center justify-center gap-1 whitespace-nowrap border-0 bg-transparent px-2 text-[12px] font-medium uppercase tracking-[0.06em] text-current focus:outline-none hover:opacity-70',
          className,
        )}
      >
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="rounded-none border-border bg-background focus:outline-none">
        {localization.locales
          .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
          .map((locale) => (
            <SelectItem
              className="cursor-pointer text-[12px] font-normal uppercase tracking-[0.06em] text-foreground"
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
