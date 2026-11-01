/**
 * Additive seed: creates sample places/businesses and one page ("all-blocks") that renders
 * every block. It never drops or overwrites anything; existing slugs are skipped.
 * Run: npx tsx --tsconfig tsconfig.json scripts/seed-showcase.ts
 */
import { getPayload } from 'payload'

import config from '../src/payload.config.js'

const locale = 'en' as const

const text = (t: string, tag?: string) =>
  tag
    ? { type: 'heading', tag, version: 1, format: '', indent: 0, direction: 'ltr', children: [{ type: 'text', text: t, version: 1, format: 0, detail: 0, mode: 'normal', style: '' }] }
    : { type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', textFormat: 0, children: [{ type: 'text', text: t, version: 1, format: 0, detail: 0, mode: 'normal', style: '' }] }

const rich = (...nodes: any[]) => ({
  root: { type: 'root', version: 1, format: '', indent: 0, direction: 'ltr', children: nodes },
})

const url = (label: string, u: string, appearance?: 'default' | 'outline') => ({
  type: 'custom' as const,
  url: u,
  label,
  ...(appearance ? { appearance } : {}),
})

const run = async () => {
  const payload = await getPayload({ config })

  const media = (await payload.find({ collection: 'media', limit: 20, depth: 0 })).docs.filter(
    (m: any) => m.mimeType?.startsWith('image/'),
  )
  const img = (i: number) => media[i % media.length].id
  const posts = (await payload.find({ collection: 'posts', limit: 10, depth: 0 })).docs
  const events = (await payload.find({ collection: 'events', limit: 10, depth: 0 })).docs
  const forms = (await payload.find({ collection: 'forms', limit: 1, depth: 0 })).docs

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'all-blocks' } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs.length) {
    console.log('Page "all-blocks" already exists, nothing to do.')
    process.exit(0)
  }

  // --- Island, places, businesses (only if missing) ---
  const findOrCreate = async (collection: any, slug: string, data: any) => {
    const f = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0 })
    if (f.docs[0]) return f.docs[0]
    return payload.create({ collection, data: { slug, ...data }, locale })
  }

  const island: any = await findOrCreate('islands', 'kendhoo', {
    name: 'Kendhoo',
    description: 'A small, friendly island in Baa Atoll.',
    image: img(0),
    location: { latitude: 5.2674, longitude: 73.0, atoll: 'Baa Atoll' },
  })

  const placeSeeds: [string, string, string, number][] = [
    ['sunset-beach', 'beach', 'Sunset Beach', 1],
    ['house-reef-snorkel', 'thingsToDo', 'House Reef Snorkelling', 2],
    ['old-mosque', 'placesToVisit', 'Old Friday Mosque', 3],
  ]
  for (const [slug, type, name, i] of placeSeeds) {
    await findOrCreate('places', slug, {
      name,
      type,
      island: island.id,
      image: img(i),
      description: 'Sample entry — replace with real content.',
      tags: [{ tag: 'Sample' }],
    })
  }

  const bizSeeds: [string, string, string, boolean][] = [
    ['harbour-cafe', 'restaurant', 'Harbour Café', true],
    ['island-store', 'shop', 'Island Store', false],
    ['reef-guesthouse', 'accommodation', 'Reef Guesthouse', true],
    ['dive-centre', 'service', 'Kendhoo Dive Centre', false],
  ]
  for (const [slug, category, name, featured] of bizSeeds) {
    await findOrCreate('businesses', slug, {
      name,
      category,
      island: island.id,
      featured,
      description: 'Sample entry — replace with real content.',
      hours: '08:00 – 22:00',
    })
  }

  // --- The showcase page ---
  const layout: any[] = [
    { blockType: 'richTextBlock', richText: rich(text('Every block, one page', 'h2'), text('A reference page that renders each content block available in the editor. Replace or delete any section you do not need.')) },
    { blockType: 'cta', richText: rich(text('Plan your visit', 'h3'), text('Ferries, stays and things to do on Kendhoo.')), links: [{ link: url('See transfers', '#transfers', 'default') }, { link: url('Read the news', '/posts', 'outline') }] },
    { blockType: 'content', columns: [
      { size: 'half', richText: rich(text('Column one', 'h3'), text('Half-width text column.')) },
      { size: 'half', richText: rich(text('Column two', 'h3'), text('Another half-width column.')) },
    ] },
    { blockType: 'mediaBlock', position: 'default', media: img(0) },
    { blockType: 'noticeBoard', title: 'Notice Board', notices: [
      { title: 'Water supply interruption', body: 'Supply will be off from 09:00 to 13:00 for pipe maintenance.', category: 'utilities', date: '2026-11-03', pinned: true },
      { title: 'Council meeting open to residents', body: 'Monthly meeting at the council office.', category: 'council', date: '2026-11-05' },
      { title: 'Rough seas advisory', body: 'Speedboat departures may be delayed.', category: 'urgent', date: '2026-11-01', linkLabel: 'Ferry times', linkUrl: '#transfers' },
    ] },
    { blockType: 'transfers', title: 'Ferries & Transfers', description: 'Public ferries and private speedboats. Sample data — confirm times with the operator.', options: [
      { type: 'ferry', name: 'Public Ferry', image: img(1), from: 'Kendhoo', to: 'Malé', duration: '4 h', price: 'MVR 60', departures: [{ time: '07:30', days: 'Sun, Tue, Thu' }, { time: '14:00', days: 'Daily', note: 'Via Dharavandhoo' }], notes: 'Fares are per person, one way.' },
      { type: 'speedboat', name: 'Sample Speedboat Co.', image: img(2), from: 'Kendhoo', to: 'Dharavandhoo airport', duration: '35 min', price: 'USD 40 per person', onRequest: true, contactName: 'Booking desk', phone: '+960 000 0000', whatsapp: '9600000000', email: 'speedboat@example.com' },
    ] },
    { blockType: 'timetable', title: 'Clinic hours', description: 'Sample timetable', rows: [
      { time: '08:00', label: 'General outpatient', days: 'Sun – Thu' },
      { time: '14:00', label: 'Maternal & child health', days: 'Mon, Wed' },
      { time: '20:00', label: 'Emergency only', days: 'Daily', note: 'Call ahead' },
    ] },
    { blockType: 'usefulNumbers', title: 'Useful Numbers', contacts: [
      { name: 'Police', detail: '24 hours', phone: '119', emergency: true },
      { name: 'Ambulance', detail: '24 hours', phone: '102', emergency: true },
      { name: 'Fire & Rescue', detail: '24 hours', phone: '118', emergency: true },
      { name: 'Island Council', detail: 'Sample number', phone: '+960 000 0000' },
    ] },
    { blockType: 'downloads', title: 'Downloads', description: 'Forms and documents. Sample links — attach real files in the editor.', files: [
      { title: 'Council service request form', description: 'Printable form', category: 'Forms', externalUrl: '/posts' },
      { title: 'Island map', description: 'Walking map of Kendhoo', category: 'Maps', externalUrl: '/posts' },
    ] },
    { blockType: 'faq', badge: 'FAQ', title: 'Frequently asked', titleAccent: 'questions', email: 'hello@example.com', ctaLabel: 'Get in touch', ctaLink: 'mailto:hello@example.com', image: img(3), items: [
      { question: 'How do I get to Kendhoo?', answer: 'By public ferry or speedboat from Malé or Dharavandhoo airport.' },
      { question: 'Is there a bank?', answer: 'Sample answer — replace with real information.' },
    ] },
    { blockType: 'quickFacts', title: 'Quick facts', layout: 'stats', description: 'Island at a glance', facts: [
      { icon: 'users', label: 'Population', value: '1,800' },
      { icon: 'map', label: 'Atoll', value: 'Baa' },
      { icon: 'ship', label: 'Ferry time', value: '4 h' },
    ] },
    { blockType: 'gallery', eyebrow: 'Gallery', title: 'Island life', layout: 'grid', images: [0, 1, 2, 3].map((i) => ({ image: img(i), caption: `Photo ${i + 1}`, location: 'Kendhoo' })) },
    { blockType: 'photoGallery', images: [0, 1, 2, 3].map(img) },
    { blockType: 'placesGrid', title: 'Things to do', type: 'thingsToDo', island: island.id, limit: 6 },
    { blockType: 'businessDirectory', title: 'Business directory', category: 'all', island: island.id, limit: 6 },
    { blockType: 'destinations', destinations: [0, 1, 2].map((i) => ({ image: img(i), title: ['Sunset Beach', 'House Reef', 'Old Mosque'][i], subtitle: 'Sample', link: '/things-to-do' })) },
    { blockType: 'contactInfo', title: 'Contact', description: 'Sample contact details.', image1: img(1), image2: img(2), address: 'Kendhoo, Baa Atoll, Maldives', phone: '+960 000 0000', email: 'hello@example.com', emergencyContacts: [{ label: 'Police', icon: 'shield', phone: '119' }, { label: 'Ambulance', icon: 'cross', phone: '102' }], emergencyNoteTitle: 'In an emergency', emergencyNoteDescription: 'Call the numbers above.' },
    { blockType: 'testimonials', title: 'Visitors say', items: [
      { quote: 'Quiet, friendly and beautiful.', name: 'Sample Visitor', role: 'Guest' },
      { quote: 'Great snorkelling right off the beach.', name: 'Another Visitor', role: 'Diver' },
    ] },
    { blockType: 'whyUs', title: 'Why Kendhoo', items: [0, 1, 2].map((i) => ({ image: img(i), title: ['Local life', 'Clear water', 'Easy access'][i], description: 'Sample description.' })), ctaTitle: 'Ready to visit?', ctaDescription: 'See how to get here.', ctaLink: [{ link: url('Transfers', '#transfers', 'default') }] },
    { blockType: 'stats', title: 'By the numbers', description: 'Sample figures', image: img(0), stats: [
      { number: '1,800', label: 'Residents', link: url('More', '/posts') },
      { number: '12', label: 'Guesthouses', link: url('More', '/posts') },
      { number: '3', label: 'Daily ferries', link: url('More', '/posts') },
    ] },
    { blockType: 'eventTimeline', title: 'Festival programme', items: [
      { dayLabel: 'Day 1', title: 'Opening ceremony', description: 'Sample description.', images: [img(1)] },
      { dayLabel: 'Day 2', title: 'Boat race', description: 'Sample description.', images: [img(2)] },
    ] },
    { blockType: 'whatsIncluded', title: "What's included", items: [{ label: 'Return ferry' }, { label: 'Local guide' }, { label: 'Lunch' }] },
    { blockType: 'recommendedEvents', title: 'Recommended', events: [
      { image: img(1), badge: 'Popular', ageRange: 'All ages', title: 'Sunset fishing trip', durationLabel: '2 h', tags: [{ label: 'Boat' }, { label: 'Family' }], buttonLabel: 'Details' },
    ] },
    { blockType: 'blogArchive', badge: 'News', heading: 'Latest from the island', subtitle: 'Stories and updates', limit: 3 },
    { blockType: 'latestNewsV2', heading: 'Latest news', subtitle: 'Fresh from the island', link: url('All news', '/posts'), limit: 3 },
    ...(posts[0]
      ? [
          { blockType: 'featuredPost', post: posts[0].id },
          { blockType: 'archive', populateBy: 'selection', relationTo: 'posts', selectedDocs: posts.map((p: any) => ({ relationTo: 'posts', value: p.id })) },
        ]
      : []),
    ...(posts.length >= 2
      ? [{ blockType: 'editorsPick', heading: "Editor's pick", featuredPost: posts[0].id, posts: posts.slice(1).map((p: any) => p.id) }]
      : []),
    ...(events.length ? [{ blockType: 'eventsList', title: 'Upcoming events', events: events.map((e: any) => e.id) }] : []),
    ...(forms[0] ? [{ blockType: 'formBlock', form: forms[0].id, enableIntro: true, introContent: rich(text('Get in touch', 'h3')) }] : []),
  ]

  const page = await payload.create({
    collection: 'pages',
    locale,
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'All Blocks',
      slug: 'all-blocks',
      _status: 'published',
      hero: { type: 'lowImpact', title: 'All Blocks' },
      layout,
    } as any,
  })
  console.log('Created page', page.id, 'with', layout.length, 'blocks')
  process.exit(0)
}

run().catch((e) => {
  console.error('SEED ERROR', e?.message || e, JSON.stringify(e?.data ?? '', null, 1).slice(0, 1500))
  process.exit(1)
})
