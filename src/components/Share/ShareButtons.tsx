'use client'

import { Check, Link2, Share2 } from 'lucide-react'
import React, { useState } from 'react'

export const ShareButtons: React.FC<{ title: string }> = ({ title }) => {
  const [copied, setCopied] = useState(false)

  const url = () => window.location.href

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: url() })
      } catch {
        // dismissed by the user
      }
    } else {
      copy()
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', url())
    }
  }

  const cls =
    'inline-flex h-11 items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] hover:opacity-70'

  return (
    <div className="flex flex-wrap items-center gap-x-6">
      <button type="button" onClick={share} className={cls}>
        <Share2 className="h-4 w-4" strokeWidth={1.5} />
        Share
      </button>
      <button type="button" onClick={copy} className={cls}>
        {copied ? (
          <Check className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
        )}
        <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
      </button>
      <a
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=${encodeURIComponent(title)}`}
        onClick={(e) => {
          e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`
        }}
      >
        WhatsApp
      </a>
    </div>
  )
}
