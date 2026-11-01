'use client'

import React, { useState } from 'react'

type Props = {
  locale: string
  placeholder: string
  button: string
  success?: string
}

export const NewsletterForm: React.FC<Props> = ({
  locale,
  placeholder,
  button,
  success = 'Thank you. You are on the list.',
}) => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const company = String(new FormData(e.currentTarget).get('company') || '')
    setState('sending')
    try {
      const res = await fetch('/next/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, company }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className="font-serif text-2xl italic">
        {success}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row" noValidate={false}>
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="h-12 flex-1 border-0 border-b border-foreground bg-transparent px-0 text-[16px] placeholder:text-muted-foreground focus:outline-none"
      />
      {/* honeypot, hidden from people and assistive tech */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="h-12 border border-foreground bg-foreground px-8 text-[12px] font-medium uppercase tracking-[0.06em] text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {button}
      </button>
      {state === 'error' && (
        <p role="alert" className="text-sm text-destructive sm:basis-full">
          Something went wrong. Please check the address and try again.
        </p>
      )}
    </form>
  )
}
