import React from 'react'
import { useLocale, useTranslations } from 'next-intl'

export type FaqItem = {
  image: string
  question: string
  answer: string
  link?: string
}

export type FaqBlockProps = {
  title?: string
  subtitle?: string
  items: FaqItem[]
  learnMoreUrl?: string
}

export const FaqBlock: React.FC<FaqBlockProps> = ({ title, subtitle, items, learnMoreUrl }) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="bg-[#FAF9F6] py-16 px-2 md:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">FAQ</span>
          </div>
          {learnMoreUrl && (
            <a href={learnMoreUrl} className="px-5 py-2 rounded-full bg-black text-white font-semibold text-sm hover:bg-gray-900 transition">Learn more</a>
          )}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">{title || 'Important questions and answers'}</h2>
        {subtitle && <p className="text-center text-lg text-gray-500 mb-8">{subtitle}</p>}
        <div className="divide-y divide-gray-200 bg-white rounded-2xl shadow-sm overflow-hidden mt-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center py-6 px-4 md:px-8 gap-4">
              <div className="flex-shrink-0">
                <img src={item.image} alt="" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg text-gray-900 mb-1">{item.question}</div>
                <div className="text-gray-600 text-base">{item.answer}</div>
              </div>
              {item.link && (
                <a href={item.link} className="ml-4 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition" target="_blank" rel="noopener noreferrer" aria-label="Learn more">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
