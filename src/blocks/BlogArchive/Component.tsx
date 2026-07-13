'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

import type { Post, Category } from '@/payload-types'
import RichText from '@/components/RichText'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

interface BlogArchiveBlockProps {
  introContent?: any
  limit?: number
  showCategories?: boolean
  showIslands?: boolean
  categories?: (Category | string)[]
  islands?: any[]
}

type PostWithRelations = Post & {
  island?: any
}

export const BlogArchiveBlock: React.FC<BlogArchiveBlockProps> = ({
  introContent,
  limit = 12,
  showCategories = true,
  showIslands = true,
  categories: initialCategories = [],
  islands: initialIslands = [],
}) => {
  const locale = useLocale()
  const [posts, setPosts] = useState<PostWithRelations[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [allIslands, setAllIslands] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIslands, setSelectedIslands] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all posts, categories, and islands
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch posts
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?limit=999&where[_status][equals]=published`,
        )
        const { docs: allPosts } = await postsRes.json()
        setPosts(allPosts || [])

        // Fetch all categories
        if (showCategories) {
          const categoriesRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?limit=999`,
          )
          const { docs: cats } = await categoriesRes.json()
          setAllCategories(cats || [])
        }

        // Fetch all islands
        if (showIslands) {
          try {
            const islandsRes = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/islands?limit=999`,
            )
            const { docs: isles } = await islandsRes.json()
            setAllIslands(isles || [])
          } catch (err) {
            console.warn('Islands collection not yet available')
          }
        }
      } catch (err) {
        console.error('Error fetching blog data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [showCategories, showIslands])

  // Filter posts based on selected categories and islands
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      (Array.isArray(post.categories) &&
        post.categories.some((cat: any) => {
          const catId = typeof cat === 'string' ? cat : cat?.id
          return selectedCategories.includes(catId)
        }))

    const matchesIsland =
      selectedIslands.length === 0 ||
      (post.island &&
        selectedIslands.includes(typeof post.island === 'string' ? post.island : post.island?.id))

    return matchesCategory && matchesIsland
  })

  const handleCategoryToggle = useCallback((categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }, [])

  const handleIslandToggle = useCallback((islandId: string) => {
    setSelectedIslands((prev) =>
      prev.includes(islandId) ? prev.filter((id) => id !== islandId) : [...prev, islandId],
    )
  }, [])

  const getCategoryColor = (cat: any) => {
    if (!cat) return '#3B82F6'
    if (typeof cat === 'string') return '#3B82F6'
    return (cat as any)?.color || '#3B82F6'
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Intro Content */}
        {introContent && (
          <div className="mb-12 prose prose-lg dark:prose-invert max-w-none">
            <RichText content={introContent} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          {showCategories && allCategories.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 rtl:text-right">
                {locale === 'dv' ? 'ވިސްނޫນުތަކާއި ތާވަލެއް' : 'Categories'}
              </h3>
              <div className="flex flex-wrap gap-2 rtl:justify-end">
                {allCategories.map((category) => {
                  const catId = category?.id || (typeof category === 'string' ? category : '')
                  return (
                    <button
                      key={catId}
                      onClick={() => handleCategoryToggle(catId)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategories.includes(catId)
                          ? 'text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                      style={
                        selectedCategories.includes(catId)
                          ? { backgroundColor: getCategoryColor(category) }
                          : undefined
                      }
                    >
                      {typeof category === 'string' ? category : (category as any)?.title}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Island Filter */}
          {showIslands && allIslands.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 rtl:text-right">
                {locale === 'dv' ? 'ތިރާވެތް' : 'Islands'}
              </h3>
              <div className="flex flex-wrap gap-2 rtl:justify-end">
                {allIslands.map((island) => {
                  const islandId = island?.id || (typeof island === 'string' ? island : '')
                  return (
                    <button
                      key={islandId}
                      onClick={() => handleIslandToggle(islandId)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedIslands.includes(islandId)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                    >
                      {typeof island === 'string' ? island : island?.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'dv' ? 'ދިރާސަކުރަނީ...' : 'Loading...'}
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {locale === 'dv' ? 'ކިޔަވެ ދެވިފަދާ އިبارަތްތަކެއް ނެތް.' : 'No posts found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, limit).map((post) => {
              const postCategories = Array.isArray(post.categories) ? post.categories : []
              const postSlug = typeof post.slug === 'string' ? post.slug : ''
              const postTitle = typeof post.title === 'string' ? post.title : 'Untitled'

              return (
                <Link
                  key={post.id}
                  href={generatePreviewPath({
                    slug: postSlug,
                    collection: 'posts',
                    locale: locale,
                  })}
                  className="group block"
                >
                  <article className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                    {/* Featured Image */}
                    {post.meta?.image && (
                      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                        <img
                          src={
                            typeof post.meta.image === 'string'
                              ? post.meta.image
                              : `${process.env.NEXT_PUBLIC_SERVER_URL}${(post.meta.image as any)?.url}`
                          }
                          alt={postTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-grow p-4">
                      {/* Categories */}
                      {postCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 rtl:justify-end">
                          {postCategories.slice(0, 2).map((cat: any) => {
                            const catId =
                              typeof cat === 'string' ? cat : (cat as Category)?.id || ''
                            const catTitle =
                              typeof cat === 'string' ? cat : (cat as Category)?.title || ''
                            return (
                              <span
                                key={catId}
                                className="px-2 py-1 text-xs text-white rounded"
                                style={{
                                  backgroundColor: getCategoryColor(cat),
                                }}
                              >
                                {catTitle}
                              </span>
                            )
                          })}
                        </div>
                      )}

                      {/* Island Badge */}
                      {post.island && (
                        <div className="mb-2">
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded">
                            📍{' '}
                            {typeof post.island === 'string'
                              ? post.island
                              : (post.island as any)?.name}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors rtl:text-right line-clamp-2">
                        {postTitle}
                      </h3>

                      {/* Date */}
                      {post.publishedAt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto rtl:text-right">
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === 'dv' ? 'dv-MV' : 'en-US',
                          )}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}

        {/* Show More Button */}
        {filteredPosts.length > limit && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {locale === 'dv' ? 'އިތުރު ބަސްވަެވްޖާ ކިޔަވާ' : 'View All Posts'}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
