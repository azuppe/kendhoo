import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { SaveButton } from '@/components/Saved/SaveButton'
import { ShareButtons } from '@/components/Share/ShareButtons'
import { useTranslations } from 'next-intl'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {
    categories,
    coverImage,
    meta: { image: metaImage, description } = {},
    populatedAuthors,
    publishedAt,
    title,
  } = post
  const heroImage = coverImage && typeof coverImage === 'object' ? coverImage : metaImage
  const t = useTranslations()
  const category = Array.isArray(categories) && typeof categories[0] === 'object' ? categories[0] : null

  return (
    <header className="flex flex-col">
      <div className="mx-auto max-w-4xl pt-8 text-center md:pt-14">
        {category?.title && <span className="eyebrow-brass">{category.title}</span>}
        <h1 className="mt-6 text-5xl leading-[1.02] md:text-7xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-muted-foreground">
            {description}
          </p>
        )}
        <div className="eyebrow mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {populatedAuthors && populatedAuthors.length > 0 && (
            <span>
              {t('author')}: {populatedAuthors.map((author) => author.name).join(', ')}
            </span>
          )}
          {publishedAt && <span>{formatDateTime(publishedAt)}</span>}
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 border-y border-border py-2">
        <SaveButton id={String(post.id)} label />
        <ShareButtons title={title} />
      </div>

      <div className="relative mt-16 aspect-[3/2] w-full overflow-hidden bg-card md:aspect-[16/9]">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill imgClassName="object-cover w-full h-full" resource={heroImage} alt={title} priority />
        )}
      </div>
    </header>
  )
}
