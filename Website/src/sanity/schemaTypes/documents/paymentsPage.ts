import { defineArrayMember, defineField, defineType } from 'sanity'

export const paymentsPage = defineType({
  name: 'paymentsPage',
  title: 'Payments page',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', type: 'string' }),
    defineField({ name: 'heading', type: 'splitHeading' }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({
      name: 'options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({
              name: 'bullets',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({ name: 'linkLabel', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
            defineField({ name: 'image', type: 'figure' }),
            defineField({
              name: 'variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (filled)', value: 'primary' },
                  { title: 'Secondary (outline)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'eyebrow', media: 'image' },
          },
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: { prepare: () => ({ title: 'Payments page' }) },
})
