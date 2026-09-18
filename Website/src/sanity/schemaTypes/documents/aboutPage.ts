import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', type: 'string' }),
    defineField({ name: 'heading', type: 'splitHeading' }),
    defineField({ name: 'image', type: 'figure' }),
    defineField({ name: 'aside', type: 'text', rows: 4 }),
    defineField({
      name: 'values',
      title: 'Value columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'kicker', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'kicker' } },
        }),
      ],
    }),
    defineField({
      name: 'closing',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({
          name: 'links',
          type: 'array',
          of: [defineArrayMember({ type: 'ctaLink' })],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
})
