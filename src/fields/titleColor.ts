import type { Field } from 'payload'

export const titleColorField: Field = {
  name: 'titleColor',
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
}

export default titleColorField
