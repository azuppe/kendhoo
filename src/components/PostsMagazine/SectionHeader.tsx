import Link from 'next/link'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export const SectionHeader: React.FC<{ title: string; href?: string }> = async ({
  title,
  href,
}) => {
  const t = await getTranslations()

  return (
    <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-border pb-5">
      <h2 className="font-serif text-4xl lg:text-5xl">{title}</h2>
      {href && (
        <Link href={href} className="eyebrow whitespace-nowrap py-3 hover:text-foreground">
          {t('see-all')}
        </Link>
      )}
    </div>
  )
}
