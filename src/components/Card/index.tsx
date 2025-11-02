'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Eye } from 'lucide-react'

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
        ' p-[12px]  rounded-2xl overflow-hidden  bg-white border border-gray-200',
        className
      )}
      
    >
      <div className="w-full rounded-xl ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} imgClassName='object-cover !rounded-xl h-48 ' className="  " />
        )}
      </div>

      <div className="space-y-2 pt-4">
        <div className=" flex  justify-between  items-center">
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
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
          <div className="flex items-center justify-end text-gray-500 text-xs gap-1">
            <Eye size={14} />
            <span>2.5m</span>
          </div>
        </div>

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link
                className="text-sm font-semibold text-gray-900 leading-snug not-prose"
                href={href}
                ref={link.ref}
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        <div className="text-sm text-gray-500">{sanitizedDescription}</div>
      </div>
    </article>
  )
}
