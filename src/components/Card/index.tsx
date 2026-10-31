'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Post
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const locale = useLocale()
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${locale}/${relationTo}/${slug}`

  return (

    <article
      ref={card.ref}
            className={cn(
        'group overflow-hidden bg-transparent',
        className
      )}
      
    >
      <div className="w-full overflow-hidden bg-card">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} imgClassName='h-64 object-cover transition-transform duration-700 group-hover:scale-[1.03]' className="  " />
        )}
      </div>

      <div className="space-y-3 pt-5">
        <div className=" flex  justify-between  items-center">
          {showCategories && hasCategories && (
            <div className="mb-2">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          <span className="eyebrow-brass">
                            {categoryTitle}
                          </span>

                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </Fragment>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )}
          
        </div>

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link
                className="not-prose font-serif text-[26px] leading-[1.12] hover:opacity-70"
                href={href}
                ref={link.ref}
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        <div className="text-[15px] leading-relaxed text-muted-foreground">{sanitizedDescription}</div>
      </div>
    </article>
  )
}
