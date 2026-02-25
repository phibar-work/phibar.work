import type { Field } from 'payload'

const isNotNone = (_data: unknown, siblingData: Record<string, unknown> | undefined) =>
  siblingData?.type !== 'none'

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
        { label: 'Blueprint', value: 'blueprint' },
      ],
    },
    {
      name: 'sectionId',
      type: 'text',
      required: true,
      admin: {
        description: 'HTML-safe anchor ID for navigation (e.g. "hero", "intro")',
        condition: isNotNone,
      },
    },
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Short title displayed in the navigation menu and for screen readers',
        condition: isNotNone,
      },
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
    {
      name: 'headline',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.type === 'blueprint',
      },
    },
    {
      name: 'subline',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.type === 'blueprint',
      },
    },
  ],
}
