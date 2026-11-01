import type { Block } from 'payload'

import { titleColorField } from '@/fields/titleColor'

export const Transfers: Block = {
  slug: 'transfers',
  interfaceName: 'TransfersBlock',
  labels: { singular: 'Ferry & Transfers', plural: 'Ferry & Transfers' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Ferries & Transfers' },
    titleColorField,
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Transfer option', plural: 'Transfer options' },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'ferry',
          options: [
            { label: 'Public ferry', value: 'ferry' },
            { label: 'Speedboat', value: 'speedboat' },
            { label: 'Seaplane', value: 'seaplane' },
            { label: 'Domestic flight', value: 'flight' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Operator or vessel, e.g. "Kendhoo Express"' },
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'from', type: 'text', localized: true },
        { name: 'to', type: 'text', localized: true },
        { name: 'duration', type: 'text', localized: true, admin: { description: 'e.g. "45 min"' } },
        { name: 'price', type: 'text', localized: true, admin: { description: 'e.g. "MVR 60" or "USD 35 per person"' } },
        {
          name: 'departures',
          type: 'array',
          labels: { singular: 'Departure', plural: 'Departures' },
          fields: [
            { name: 'time', type: 'text', required: true, admin: { description: 'e.g. "07:30"' } },
            { name: 'days', type: 'text', localized: true, admin: { description: 'e.g. "Daily" or "Sun, Tue, Thu"' } },
            { name: 'note', type: 'text', localized: true },
          ],
        },
        {
          name: 'onRequest',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'No fixed schedule; runs on request (typical for speedboats).' },
        },
        { name: 'notes', type: 'textarea', localized: true },
        {
          type: 'collapsible',
          label: 'Contact & booking',
          admin: { initCollapsed: false },
          fields: [
            { name: 'contactName', type: 'text', localized: true },
            { name: 'phone', type: 'text' },
            { name: 'whatsapp', type: 'text', admin: { description: 'Number with country code, e.g. 9607771234' } },
            { name: 'email', type: 'email' },
            { name: 'bookingUrl', type: 'text' },
          ],
        },
      ],
    },
  ],
}
