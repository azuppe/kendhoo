import configPromise from '@payload-config'
import { getPayload } from 'payload'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: Request) {
  let body: { email?: unknown; locale?: unknown; company?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this in. Pretend success so bots move on.
  if (typeof body.company === 'string' && body.company.trim()) {
    return Response.json({ ok: true })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: 'invalid-email' }, { status: 400 })
  }
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 8) : undefined

  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'subscribers',
      data: { email, locale },
      overrideAccess: true,
    })
  }

  // Same answer whether or not the address was already subscribed, so the form can't be used to probe the list.
  return Response.json({ ok: true })
}
