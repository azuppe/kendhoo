import Link from 'next/link'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export const SectionHeader: React.FC<{ title: string; href?: string }> = async ({
  title,
  href,
}) => {
  const t = await getTranslations()

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-red-600 whitespace-nowrap">
          {t('see-all')} &rarr;
        </Link>
      )}
    </div>
  )
}
