import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://kendhoo.online'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/*/search', '/next/preview'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
