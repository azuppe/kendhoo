import React from 'react'
import { getTranslations } from 'next-intl/server'

export const NewsletterBanner: React.FC = async () => {
  const t = await getTranslations()

  return (
    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-6 py-10 lg:px-12 lg:py-12 text-center">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
        {t('get-first-update')}
      </p>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        {t.rich('newsletter-headline', {
          red: (chunks) => <span className="text-red-600">{chunks}</span>,
        })}
      </h2>
      <form className="mx-auto flex max-w-md gap-2">
        <input
          type="email"
          required
          placeholder={t('your-email')}
          className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          {t('subscribe-button')}
        </button>
      </form>
    </div>
  )
}
