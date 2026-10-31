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

## Features added in the redesign

- **Events calendar** (`/events`): list and month views, This week / Upcoming / Past, free-only filter, and "Add to calendar" (.ics). Give each event a start date, end date, venue and "Free" flag in the admin (sidebar of an Event).
- **Search** (`/search`): filters for type, category and date range, plus as-you-type suggestions. Date and category filters need documents to be re-saved or re-indexed once, because the search index gained a `publishedAt` field and events were added to it.
- **Newsletter**: the form posts to `/next/subscribe` and stores addresses in the `Subscribers` collection (admin only).
- **Saved stories** (`/saved`): bookmarks are kept in the reader's browser (localStorage), nothing is sent to the server.
- **Dark mode**: toggle in the header, remembers the choice and follows the system setting on first visit.
- **Today in Kendhoo**: set it up under Globals > Island info. Weather uses Open-Meteo. The ferry timetable is entered by hand. Prayer times use the Aladhan API and are off by default: check them against the official Maldives timetable before turning them on.

## Tests

`pnpm test` runs the unit tests in `tests/` (calendar file export, month grid, ferry timing, saved list).
