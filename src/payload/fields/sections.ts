import type { ArrayField, TextFieldSingleValidation } from 'payload'

const validateSectionId: TextFieldSingleValidation = (value, { data }) => {
  if (!value) return 'Section ID is required'

  const doc = data as Record<string, unknown> | undefined
  if (!doc?.sections) return true

  const sections = doc.sections as { sectionId?: string }[]
  const duplicates = sections.filter((section) => section.sectionId === value)

  if (duplicates.length > 1) {
    return 'Section ID must be unique across all sections'
  }

  return true
}

export const sections: ArrayField = {
  name: 'sections',
  type: 'array',
  fields: [
    {
      name: 'htmlElement',
      type: 'select',
      defaultValue: 'section',
      required: true,
      options: [
        { label: 'Section', value: 'section' },
        { label: 'Article', value: 'article' },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
{
      name: 'sectionId',
      type: 'text',
      required: true,
      validate: validateSectionId,
    },
    {
      name: 'content',
      type: 'richText',
      label: false,
    },
  ],
}
