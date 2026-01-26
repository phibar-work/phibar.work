import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Banner', value: 'banner' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData?.type === 'banner',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.type === 'banner',
      },
    },
  ],
}
