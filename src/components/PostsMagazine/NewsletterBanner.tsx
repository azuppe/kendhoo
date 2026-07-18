import React from 'react'

export const NewsletterBanner: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gray-50 border border-gray-200 px-6 py-10 lg:px-12 lg:py-12 text-center">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
        Get first update
      </p>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Get the news in front line by <span className="text-red-600">subscribe</span> our latest
        updates
      </h2>
      <form className="mx-auto flex max-w-md gap-2">
        <input
          type="email"
          required
          placeholder="Your email"
          className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
