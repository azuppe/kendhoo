import React from 'react'
import { ArrowDown } from 'lucide-react'

import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type DownloadItem = {
  title: string
  description?: string | null
  category?: string | null
  file?: any
  externalUrl?: string | null
}

export type DownloadsBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  files?: DownloadItem[] | null
}

const formatSize = (bytes?: number | null) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const DownloadsBlock: React.FC<DownloadsBlockProps> = ({
  title,
  titleColor,
  description,
  files,
}) => {
  const items = (files || [])
    .map((f) => {
      const file = f.file && typeof f.file === 'object' ? f.file : null
      const href = file?.url || f.externalUrl
      const ext = (file?.filename || f.externalUrl || '').split('.').pop()?.split('?')[0]
      return { ...f, href, size: formatSize(file?.filesize), ext: ext && ext.length <= 5 ? ext : '' }
    })
    .filter((f) => f.href)

  if (!items.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          {title && (
            <h2 className={`text-4xl md:col-span-7 md:text-6xl ${getTitleColorClass(titleColor)}`}>
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground md:col-span-5 md:self-end">{description}</p>
          )}
        </div>
        <ul className="border-t border-foreground">
          {items.map((f, i) => (
            <li key={i} className="border-b border-foreground">
              <a
                href={f.href as string}
                download={f.file ? '' : undefined}
                target={f.file ? undefined : '_blank'}
                rel={f.file ? undefined : 'noopener noreferrer'}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 transition-colors hover:text-[hsl(var(--brass))] md:grid-cols-12 md:gap-8"
              >
                <span className="eyebrow hidden group-hover:text-[hsl(var(--brass))] md:col-span-2 md:block">
                  {f.category || 'File'}
                </span>
                <span className="md:col-span-6">
                  <span className="block text-xl font-medium md:text-2xl">{f.title}</span>
                  {f.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">{f.description}</span>
                  )}
                </span>
                <span className="hidden text-sm uppercase tabular-nums text-muted-foreground md:col-span-3 md:block">
                  {[f.ext, f.size].filter(Boolean).join(' · ')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center border border-current md:col-span-1 md:justify-self-end">
                  <ArrowDown className="h-5 w-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
