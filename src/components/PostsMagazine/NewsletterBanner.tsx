import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'

import { NewsletterForm } from '@/components/Newsletter/NewsletterForm'

export const NewsletterBanner: React.FC = async () => {
  const t = await getTranslations()
  const locale = await getLocale()

  return (
    <div className="bg-card px-6 py-20 text-center lg:px-12 lg:py-28">
      <p className="eyebrow mb-5">{t('get-first-update')}</p>
      <h2 className="mx-auto mb-10 max-w-2xl font-serif text-4xl italic lg:text-5xl">
        {t.rich('newsletter-headline', {
          red: (chunks) => <span>{chunks}</span>,
        })}
      </h2>
      <NewsletterForm
        locale={locale}
        placeholder={t('your-email')}
        button={t('subscribe-button')}
      />
    </div>
  )
}
