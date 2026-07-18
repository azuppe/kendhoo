process.loadEnvFile('.env.local')

async function main() {
  const { default: configPromise } = await import('@payload-config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, locale: 'en', limit: 1, draft: false })
  const home = docs[0]
  const layout = home.layout as any[]
  console.log(JSON.stringify(layout.map((b: any) => b.blockType)))
  console.log(JSON.stringify(layout.find((b: any) => b.blockType === 'latestNewsV2'), null, 2))
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
