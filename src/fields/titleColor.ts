import type { Field } from 'payload'

export const createTitleColorField = (name: string = 'titleColor'): Field => ({
  name,
  type: 'select',
  defaultValue: 'dark',
  options: [
    {
      label: 'Dark',
      value: 'dark',
    },
    {
      label: 'Light',
      value: 'light',
    },
  ],
  admin: {
    description: 'Choose the title color (use light on dark backgrounds).',
  },
})

export const titleColorField: Field = createTitleColorField()

export default titleColorField
