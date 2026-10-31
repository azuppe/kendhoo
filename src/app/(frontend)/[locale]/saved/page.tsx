import type { Metadata } from 'next/types'

import React from 'react'
import { TypedLocale } from 'payload'

import { SavedList } from '@/components/Saved/SavedList'

type Args = { params: Promise<{ locale: TypedLocale }> }

export default async function SavedPage({ params }: Args) {
  const { locale } = await params

  return (
    <div className="container mx-auto px-4 pb-24 pt-36 md:px-8">
      <p className="eyebrow-brass">Your reading list</p>
      <h1 className="mt-4 text-6xl md:text-8xl">Saved</h1>
      <p className="mt-6 max-w-xl text-[17px] text-muted-foreground">
        Stories you save are kept in this browser only. Nothing is sent to us.
      </p>
      <div className="mt-16 border-t border-border pt-16">
        <SavedList locale={locale} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Saved stories', robots: { index: false, follow: true } }
}
