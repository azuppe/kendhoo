import crypto from 'crypto'

import { getPayload } from 'payload'

import config from '../src/payload.config.js'

const generateSecurePassword = (length = 24): string => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lower = 'abcdefghijkmnopqrstuvwxyz'
  const digits = '23456789'
  const symbols = '!@#$%^&*()-_=+'
  const all = upper + lower + digits + symbols

  const pick = (chars: string) => chars[crypto.randomInt(chars.length)]

  const required = [pick(upper), pick(lower), pick(digits), pick(symbols)]
  const rest = Array.from({ length: length - required.length }, () => pick(all))

  const password = [...required, ...rest]
  // Shuffle so the required characters aren't always in the same position
  for (let i = password.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1)
    ;[password[i], password[j]] = [password[j], password[i]]
  }

  return password.join('')
}

const run = async () => {
  const email =  'admin@kendhoo.com'
  const password =  'password' // generateSecurePassword()
  const force = process.env.ADMIN_FORCE === 'true'

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    if (!force) {
      payload.logger.error(
        `A user with email "${email}" already exists. Run with ADMIN_FORCE=true to reset their password.`,
      )
      await payload.destroy()
      process.exit(1)
    }

    await payload.update({
      collection: 'users',
      id: existing.docs[0]!.id,
      data: { password },
    })
    payload.logger.info(`Password reset for existing admin user "${email}".`)
  } else {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email,
        password,
      },
    })
    payload.logger.info(`Admin user "${email}" created.`)
  }

  console.log('\n==================== ADMIN CREDENTIALS ====================')
  console.log(`Email:    ${email}`)
  console.log(`Password: ${password}`)
  console.log('=============================================================')
  console.log('Store these somewhere safe and change the password after first login.\n')

  await payload.destroy()
  process.exit(0)
}

await run().catch((error) => {
  console.error('Error seeding admin user:', error)
  process.exit(1)
})
