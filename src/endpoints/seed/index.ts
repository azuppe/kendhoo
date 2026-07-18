import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { image1 } from './image-1'
import { image2 } from './image-2'
import { lexicalText } from './lexical'
import {
  businessesData,
  categoriesData,
  emergencyContactsData,
  islandsData,
  placesData,
  postsData,
  quickFactsData,
  testimonialsData,
} from './island-content'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'islands' as CollectionSlug,
  'places' as CollectionSlug,
  'businesses' as CollectionSlug,
  'forms',
  'form-submissions',
]
const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // #region Clearing database
  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(dirname, '../../public/media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  for (const global of globals) {
    await payload.updateGlobal({
      slug: global,
      data: {
        navItems: [],
      },
      req,
    })
  }

  for (const collection of collections) {
    await payload.delete({
      collection: collection,
      where: {
        id: {
          exists: true,
        },
      },
      req,
    })
  }
  // #endregion

  // #region Users
  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: 'demo-author@payloadcms.com',
      },
    },
    req,
  })

  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Author',
      email: 'demo-author@payloadcms.com',
      password: 'password',
    },
    req,
  })
  // #endregion

  // #region Media
  payload.logger.info(`— Seeding media...`)
  const image1Doc = await payload.create({
    collection: 'media',
    data: image1('en'),
    locale: 'en',
    filePath: path.resolve(dirname, 'image-post1.webp'),
    req,
  })
  await payload.update({
    collection: 'media',
    id: image1Doc.id,
    data: image1('dv'),
    locale: 'dv',
    filePath: path.resolve(dirname, 'image-post1.webp'),
    req,
  })

  const image2Doc = await payload.create({
    collection: 'media',
    locale: 'en',
    data: image2('en'),
    filePath: path.resolve(dirname, 'image-post2.webp'),
    req,
  })
  await payload.update({
    collection: 'media',
    id: image2Doc.id,
    data: image2('dv'),
    locale: 'dv',
    filePath: path.resolve(dirname, 'image-post2.webp'),
    req,
  })

  const image3Doc = await payload.create({
    collection: 'media',
    locale: 'en',
    data: image2('en'),
    filePath: path.resolve(dirname, 'image-post3.webp'),
    req,
  })
  await payload.update({
    collection: 'media',
    id: image3Doc.id,
    data: image2('dv'),
    locale: 'dv',
    filePath: path.resolve(dirname, 'image-post3.webp'),
    req,
  })

  const imageHomeDoc = await payload.create({
    collection: 'media',
    locale: 'en',
    data: image1('en'),
    filePath: path.resolve(dirname, 'image-hero1.webp'),
    req,
  })
  await payload.update({
    collection: 'media',
    id: imageHomeDoc.id,
    data: image1('dv'),
    locale: 'dv',
    filePath: path.resolve(dirname, 'image-hero1.webp'),
    req,
  })

  const galleryImages = [image1Doc, image2Doc, image3Doc, imageHomeDoc]
  // #endregion

  // #region Categories
  payload.logger.info(`— Seeding categories...`)
  const categoryDocs: any[] = []
  for (const cat of categoriesData) {
    const doc = await payload.create({
      collection: 'categories',
      locale: 'en',
      data: { title: cat.en.title, description: cat.en.description, icon: cat.icon, color: cat.color },
      req,
    })
    await payload.update({
      collection: 'categories',
      id: doc.id,
      locale: 'dv',
      data: { title: cat.dv.title, description: cat.dv.description },
      req,
    })
    categoryDocs.push(doc)
  }
  // #endregion

  // #region Islands
  payload.logger.info(`— Seeding islands...`)
  const islandDocs: any[] = []
  for (const island of islandsData) {
    const doc = await payload.create({
      collection: 'islands' as CollectionSlug,
      locale: 'en',
      data: {
        name: island.en.name,
        description: island.en.description,
        image: image2Doc.id,
        location: { latitude: island.lat, longitude: island.lng, atoll: island.en.atoll },
        attractions: island.en.attractions,
        bestTimeToVisit: island.en.bestTimeToVisit,
      },
      req,
    })
    await payload.update({
      collection: 'islands' as CollectionSlug,
      id: doc.id,
      locale: 'dv',
      data: {
        name: island.dv.name,
        description: island.dv.description,
        location: { latitude: island.lat, longitude: island.lng, atoll: island.dv.atoll },
        attractions: island.dv.attractions,
        bestTimeToVisit: island.dv.bestTimeToVisit,
      },
      req,
    })
    islandDocs.push(doc)
  }
  // #endregion

  // #region Places
  payload.logger.info(`— Seeding places...`)
  for (const place of placesData) {
    const island = islandDocs[place.islandIndex]
    const doc = await payload.create({
      collection: 'places' as CollectionSlug,
      locale: 'en',
      data: {
        name: place.en.name,
        type: place.type,
        island: island.id,
        image: image1Doc.id,
        description: place.en.description,
        openingHours: place.openingHours.en,
        tags: place.tags.map((t) => ({ tag: t.en })),
      },
      req,
    })
    await payload.update({
      collection: 'places' as CollectionSlug,
      id: doc.id,
      locale: 'dv',
      data: {
        name: place.dv.name,
        description: place.dv.description,
        openingHours: place.openingHours.dv,
        tags: place.tags.map((t) => ({ tag: t.dv })),
      },
      req,
    })
  }
  // #endregion

  // #region Businesses
  payload.logger.info(`— Seeding businesses...`)
  for (const biz of businessesData) {
    const island = islandDocs[biz.islandIndex]
    const doc = await payload.create({
      collection: 'businesses' as CollectionSlug,
      locale: 'en',
      data: {
        name: biz.en.name,
        category: biz.category,
        island: island.id,
        image: image2Doc.id,
        description: biz.en.description,
        phone: biz.phone,
        address: biz.en.address,
        hours: biz.en.hours,
        rating: biz.rating,
        featured: biz.featured,
      },
      req,
    })
    await payload.update({
      collection: 'businesses' as CollectionSlug,
      id: doc.id,
      locale: 'dv',
      data: {
        name: biz.dv.name,
        description: biz.dv.description,
        address: biz.dv.address,
        hours: biz.dv.hours,
      },
      req,
    })
  }
  // #endregion

  // #region Posts
  payload.logger.info(`— Seeding posts...`)
  const postDocs: any[] = []
  for (const post of postsData) {
    const island = islandDocs[post.islandIndex]
    const category = categoryDocs[post.categoryIndex]
    const doc = await payload.create({
      collection: 'posts',
      locale: 'en',
      data: {
        title: post.en.title,
        content: lexicalText(post.en.excerpt),
        categories: [category.id],
        island: island.id,
        authors: [demoAuthor.id],
        _status: 'published',
        meta: {
          title: post.en.title,
          description: post.en.excerpt,
          image: image1Doc.id,
        },
      },
      req,
    })
    await payload.update({
      collection: 'posts',
      id: doc.id,
      locale: 'dv',
      data: {
        title: post.dv.title,
        content: lexicalText(post.dv.excerpt),
        meta: {
          title: post.dv.title,
          description: post.dv.excerpt,
        },
      },
      req,
    })
    postDocs.push(doc)
  }
  // #endregion

  // #region Home page
  payload.logger.info(`— Seeding home page...`)

  const homeLayout = (locale: 'en' | 'dv') => [
    {
      blockType: 'quickFacts',
      title: locale === 'en' ? 'About This Guide' : 'މި ގައިޑާ ބެހޭ',
      description:
        locale === 'en'
          ? 'We believe exploring the Maldives is more than reaching a destination—it\'s about the moments you collect along the way. Whether you\'re seeking adventure, relaxation, or local culture, this guide helps you plan around what truly matters to you.\nWith up-to-date island info, trusted local businesses, and a passion for these islands, we make travel planning effortless and inspiring.'
          : 'ދިވެހިރާއްޖޭގެ ރަށްރަށް ބެލުމަކީ ހަމައެކަނި މަންޒިލަކަށް ދިއުމަށްވުރެ ބޮޑު ކަމެއް ކަމަށް އަޅުގަނޑުމެން ގަބޫލުކުރަން. މި ގައިޑް އެހީތެރިވެދޭނެ ތިޔަބޭފުޅުންނަށް އެންމެ މުހިންމު ކަންތައްތަކާ ގުޅިގެން ދަތުރު ރޭވުމަށް.',
      button: { label: locale === 'en' ? 'More about' : 'އިތުރަށް', url: '/about' },
      image1: imageHomeDoc.id,
      image2: image3Doc.id,
      facts: quickFactsData.map((f) => ({ icon: f.icon, label: f[locale].label, value: f[locale].value })),
    },
    {
      blockType: 'placesGrid',
      title: locale === 'en' ? 'Things To Do' : 'ކުރެވިދާނެ ކަންތައްތައް',
      type: 'thingsToDo',
      limit: 6,
    },
    {
      blockType: 'businessDirectory',
      title: locale === 'en' ? 'Local Businesses' : 'ލޯކަލް ވިޔަފާރިތައް',
      category: 'all',
      limit: 8,
    },
    {
      blockType: 'gallery',
      title: locale === 'en' ? 'Island Gallery' : 'ރަށުގެ ގެލެރީ',
      layout: 'grid',
      images: galleryImages.map((img) => ({ image: img.id })),
    },
    {
      blockType: 'blogArchive',
      badge: locale === 'en' ? 'Latest News' : 'އެންމެ ފަހުގެ ޚަބަރު',
      subtitle:
        locale === 'en'
          ? 'Fresh stories and updates from the islands.'
          : 'ރަށްރަށުގެ އެންމެ ފަހުގެ ވާހަކަތަކާއި މައުލޫމާތު.',
      heading:
        locale === 'en' ? "What's Happening Across the Islands?" : 'ރަށްރަށުގައި ހިނގަނީ ކޮންކަމެއް؟',
      limit: 4,
    },
    {
      blockType: 'testimonials',
      title: locale === 'en' ? 'What People Say' : 'ބުނާ ބަސްތައް',
      items: testimonialsData.map((t) => ({
        quote: t[locale].quote,
        name: t.name,
        role: t[locale].role,
      })),
    },
    {
      blockType: 'contactInfo',
      title: locale === 'en' ? 'Contact & Emergency' : 'ގުޅުއްވުމަށާއި އިމަރޖެންސީ',
      description:
        locale === 'en'
          ? 'Reach out to us for general inquiries or assistance. For urgent help, please use the emergency numbers below.'
          : 'އާންމު މައުލޫމާތަށް ނުވަތަ އެހީތެރިކަމަށް ގުޅުއްވާ. އަވަސް އެހީއަކަށް ބޭނުންވެއްޖެނަމަ ތިރީގައިވާ އިމަރޖެންސީ ނަންބަރުތަކަށް ގުޅުއްވާ.',
      image1: imageHomeDoc.id,
      image2: image1Doc.id,
      address: locale === 'en' ? 'Kaafu Atoll, Maldives' : 'ކާފު އަތޮޅު، ދިވެހިރާއްޖެ',
      phone: '+960 330 0000',
      email: 'info@islandguide.mv',
      emergencyContacts: emergencyContactsData[locale],
      emergencyNoteTitle: locale === 'en' ? 'In an emergency?' : 'އިމަރޖެންސީއެއްގައި؟',
      emergencyNoteDescription:
        locale === 'en'
          ? "Please call the relevant emergency number immediately. We're here to help keep everyone safe."
          : 'ވަގުތުން ކަމާގުޅޭ އިމަރޖެންސީ ނަންބަރަށް ގުޅުއްވާ. ހުރިހާ އެންމެންގެ ސަލާމަތަށް ތިބީ ތިޔަބޭފުޅުންނާއެކު.',
    },
  ]

  const homePage = await payload.create({
    collection: 'pages',
    locale: 'en',
    data: {
      slug: 'home',
      slugLock: false,
      _status: 'published',
      title: 'Home',
      hero: {
        type: 'landing',
        title: 'Maldives Island Guide',
        media: imageHomeDoc.id,
        links: [
          { link: { type: 'custom', appearance: 'default', label: 'Latest News', url: '/posts' } },
        ],
      },
      layout: homeLayout('en'),
      meta: {
        title: 'Maldives Island Guide',
        description: 'A local island information and travel portal for the Maldives.',
        image: imageHomeDoc.id,
      },
    } as any,
    req,
  })
  await payload.update({
    collection: 'pages',
    id: homePage.id,
    locale: 'dv',
    data: {
      title: 'ފުރަތަމަ ޞަފްޙާ',
      hero: {
        title: 'ދިވެހިރާއްޖޭގެ ރަށްރަށުގެ ގައިޑް',
        links: [
          { id: homePage.hero?.links?.[0]?.id, link: { type: 'custom', appearance: 'default', label: 'އެންމެ ފަހުގެ ޚަބަރު', url: '/posts' } },
        ],
      },
      layout: homeLayout('dv'),
      meta: {
        title: 'ދިވެހިރާއްޖޭގެ ރަށްރަށުގެ ގައިޑް',
        description: 'ދިވެހިރާއްޖޭގެ ރަށްރަށާ ބެހޭ މައުލޫމާތާއި ދަތުރުފަތުރުގެ ޕޯޓަލްއެއް.',
      },
    } as any,
    req,
  })
  // #endregion

  // #region Globals
  payload.logger.info(`— Seeding header...`)

  const header = await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'News', url: '/posts' } },
        { link: { type: 'custom', label: 'Search', url: '/search' } },
        { link: { type: 'custom', label: 'Admin', url: '/admin', newTab: true } },
      ],
    },
    req,
  })

  await payload.updateGlobal({
    slug: 'header',
    locale: 'dv',
    data: {
      navItems: [
        { id: header.navItems![0].id, link: { type: 'custom', url: '/', label: 'މައި ޞަފްޙާ' } },
        { id: header.navItems![1].id, link: { type: 'custom', url: '/posts', label: 'ޚަބަރު' } },
        { id: header.navItems![2].id, link: { type: 'custom', url: '/search', label: 'ހޯއްދަވާ' } },
        {
          id: header.navItems![3].id,
          link: { type: 'custom', url: '/admin', label: 'ޕެނަލް', newTab: true },
        },
      ],
    },
    req,
  })

  payload.logger.info(`— Seeding footer...`)

  const footer = await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: {
      ctaHeading: 'Stories Worth\nSharing',
      ctaDescription: 'Explore, discover, and stay connected to island life.',
      ctaButton: { type: 'custom', url: '/posts', label: 'Read the News' },
      contactPrompt: 'Do you have more questions? Send us an email!',
      contactEmail: 'hello@kendhoo.com',
      address: 'Kendhoo, Baa Atoll, Maldives',
      phone: '+960 660 1234',
      phoneNote: 'Questions and suggestions',
      socialLinks: [
        { label: 'Instagram', url: 'https://instagram.com' },
        { label: 'Twitter (X)', url: 'https://twitter.com' },
        { label: 'Facebook', url: 'https://facebook.com' },
      ],
      navColumnTitle: 'Explore',
      navItems: [
        { link: { type: 'custom', label: 'Admin', url: '/admin' } },
        { link: { type: 'custom', label: 'Home', url: '/' } },
      ],
      copyrightText: '© 2024 KendhooOnline. All rights reserved.',
      privacyPolicyLabel: 'Privacy Policy',
      privacyPolicyUrl: '/',
    },
    req,
  })
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'dv',
    data: {
      ctaHeading: 'ހިއްސާކުރުމަށް\nޤާބިލު ވާހަކަތައް',
      ctaDescription: 'ރަށުގެ ދިރިއުޅުމާ ބެހޭ ޚަބަރު ހޯއްދަވާ، ބައްލަވާ.',
      ctaButton: { type: 'custom', url: '/posts', label: 'ޚަބަރު ބައްލަވާ' },
      contactPrompt: 'އިތުރު ސުވާލެއް އޮތްތޯ؟ އީމެއިލް ކުރައްވާ!',
      phoneNote: 'ސުވާލާއި ހުށަހެޅުންތައް',
      navColumnTitle: 'ބައްލަވާ',
      navItems: [
        { id: footer.navItems![0].id, link: { type: 'custom', url: '/admin', label: 'ޕެނަލް' } },
        { id: footer.navItems![1].id, link: { type: 'custom', url: '/', label: 'މައި ޞަފްޙާ' } },
      ],
      copyrightText: '© 2024 ކެންދޫއޮންލައިން. ހުރިހާ ހައްޤުތަކެއް ރައްކާތެރިކުރެވިފައި.',
      privacyPolicyLabel: 'ޕްރައިވެސީ ޕޮލިސީ',
    },
    req,
  })
  // #endregion

  payload.logger.info('Seeded database successfully!')
}
