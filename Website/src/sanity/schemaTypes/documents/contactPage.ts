import { defineArrayMember, defineField, defineType } from 'sanity'

import { AUDIENCE_LABELS, isMapped } from '../../../lib/jotform-fields'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Concierge support',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', type: 'string' }),
    defineField({ name: 'heading', type: 'splitHeading' }),
    defineField({ name: 'aside', type: 'text', rows: 4 }),
    defineField({ name: 'directLabel', type: 'string' }),
    defineField({ name: 'directNote', type: 'string' }),
    defineField({
      name: 'audiences',
      title: 'Who is writing',
      description: 'Each option routes the message to a different desk.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              description:
                'Stored with the submission, e.g. homeowner. Locked on options that match a Jotform choice.',
              type: 'string',
              readOnly: ({ value }) => isMapped(AUDIENCE_LABELS, value),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'hint', type: 'text', rows: 2 }),
            defineField({ name: 'propertyLabel', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'hint' } },
        }),
      ],
    }),
    defineField({
      name: 'fieldLabels',
      title: 'Form labels',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'who', title: 'Who is writing', type: 'string' }),
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'message', type: 'string' }),
      ],
    }),
    defineField({ name: 'submitLabel', type: 'string' }),
    defineField({ name: 'sentMessage', type: 'text', rows: 2 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Concierge support' }) },
})
