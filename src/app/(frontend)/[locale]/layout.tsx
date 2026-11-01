import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Inter, Noto_Sans_Thaana } from 'next/font/google'
import React from 'react'

import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { TypedLocale } from 'payload'

import './globals.css'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import localization from '@/i18n/localization'
import { JsonLd } from '@/components/JsonLd'
import { ThemeScript } from '@/components/Theme/ThemeScript'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const thaana = Noto_Sans_Thaana({
  subsets: ['thaana'],
  weight: ['400', '500'],
  variable: '--font-thaana',
  display: 'swap',
})

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params
  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  return (
    <html
      className={cn(inter.variable, thaana.variable, GeistMono.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Kendhoo Online',
            url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online',
            logo: `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online'}/kendhoo-mark.svg`,
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Kendhoo Online',
            url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online',
          }}
        />
      </head>
      <body className="bg-background font-sans text-foreground">

          <NextIntlClientProvider messages={messages}>
            <LivePreviewListener />
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
          </NextIntlClientProvider>
       
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online'),
  title: {
    default: 'Kendhoo Online',
    template: '%s | Kendhoo Online',
  },
  description: 'Kendhoo Online — news, events, activities and places to explore.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    languages: {
      dv: '/dv',
      en: '/en',
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
