import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { ActivityDetail } from '@/components/ActivityDetail'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const activities = await payload.find({
    collection: 'activities',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return activities.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function ActivityPage({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = '/things-to-do/' + slug
  const activity = await queryActivity({ slug, locale })

  if (!activity) return <PayloadRedirects url={url} />

  return (
    <>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <ActivityDetail activity={activity} locale={locale} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  const activity = await queryActivity({ slug, locale })

  return generateMeta({ doc: activity })
}

const queryActivity = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'activities',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
