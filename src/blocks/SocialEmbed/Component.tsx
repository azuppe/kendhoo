'use client'

import React, { useEffect, useRef } from 'react'

import type { SocialEmbedBlock as SocialEmbedBlockProps } from '@/payload-types'

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1] || null
      }
      return parsed.searchParams.get('v')
    }

    return null
  } catch {
    return null
  }
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void
      }
    }
  }
}

const TWITTER_WIDGETS_SRC = 'https://platform.twitter.com/widgets.js'

function TwitterEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadWidgets = () => {
      if (window.twttr?.widgets && containerRef.current) {
        window.twttr.widgets.load(containerRef.current)
      }
    }

    if (window.twttr?.widgets) {
      loadWidgets()
      return
    }

    const existingScript = document.querySelector(`script[src="${TWITTER_WIDGETS_SRC}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', loadWidgets)
      return () => existingScript.removeEventListener('load', loadWidgets)
    }

    const script = document.createElement('script')
    script.src = TWITTER_WIDGETS_SRC
    script.async = true
    script.addEventListener('load', loadWidgets)
    document.body.appendChild(script)

    return () => script.removeEventListener('load', loadWidgets)
  }, [url])

  return (
    <div ref={containerRef} className="mx-auto my-8 flex justify-center">
      <blockquote className="twitter-tweet">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  )
}

function YouTubeEmbed({ url }: { url: string }) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) {
    return null
  }

  return (
    <div className="mx-auto my-8 aspect-video w-full max-w-3xl overflow-hidden rounded-lg">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

export const SocialEmbedBlockComponent: React.FC<SocialEmbedBlockProps> = ({ platform, url }) => {
  if (!url) {
    return null
  }

  if (platform === 'twitter') {
    return <TwitterEmbed url={url} />
  }

  return <YouTubeEmbed url={url} />
}
