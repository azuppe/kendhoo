process.loadEnvFile('.env.local')

async function main() {
  const { default: configPromise } = await import('@payload-config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, locale: 'en', limit: 1, draft: false })
  const home = docs[0]
  if (!home) {
    console.log('no home page found')
    return
  }
  const layout = (home.layout as any[]).filter((b: any) => b.blockType !== 'latestNewsV2')
  layout.push({
    blockType: 'latestNewsV2',
    heading: 'Latest News',
    subtitle: 'Fresh stories and updates from the islands, curated for your next trip.',
    link: { type: 'custom', label: 'View All News', url: '/news' },
    limit: 3,
  })
  await payload.update({ collection: 'pages', id: home.id, locale: 'en', draft: false, data: { layout, _status: 'published' } })
  console.log('updated', home.id)
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
