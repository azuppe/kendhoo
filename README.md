# Kendhoo Online

Kendhoo Online is a news and community site for Kendhoo, built with [Payload CMS](https://payloadcms.com) and Next.js, with English/Dhivehi (dv) localization via `next-intl`.

## Setup

1. `cp .env.example .env` (copy the .env.example file to .env and fill in your values)
2. `pnpm install`
3. `pnpm run dev`
4. Seed your database in the admin panel (see below)

## Seed

To seed the database with a few pages, posts, and demo content you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@kendhoo.online`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

## Localization

Content is translatable between Dhivehi (`dv`, default) and English (`en`) from the admin panel. The seed script only creates translations in English, so other locales will not show translated content until you translate documents yourself.
